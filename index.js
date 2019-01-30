'use strict';

const aws = require('aws-sdk');
const elasticsearch = require('elasticsearch');
const BoxSDK = require('box-node-sdk');

// AWS Setting
aws.config.region = process.env.AWS_REGION;
if (process.env.LOCAL) { // This part is unnecessary when not using profile
    var credentials = new aws.SharedIniFileCredentials({profile: process.env.LOCAL_PROFILE});
    aws.config.credentials = credentials;
}

// Box Setting
const boxConfig = JSON.parse(process.env.BOX_CONFIG);
boxConfig.boxAppSettings.appAuth.keyID = boxConfig.boxAppSettings.appAuth.publicKeyID;
const sdk = new BoxSDK(boxConfig.boxAppSettings);
const client = sdk.getAppAuthClient('enterprise', boxConfig.enterpriseID);

// Elasticsearch
var ES_INDEX = process.env.ES_INDEX; // Elasticsearch index name
var ES_TYPE = process.env.ES_TYPE; // Elsticsearch index type name
var ES_CLIENT = new elasticsearch.Client({
    host: process.env.ES_ENDPOINT
});

// S3 Setting
var s3 = new aws.S3();
var bucketName = process.env.S3_NEXT_POSITION_BUCKETNAME;
var fileName = 'next_position.txt';
var contentType = 'text/plain';

exports.handler = (event, context, callback) => {
    main();
};

async function main() {
    // get initial value [next_position] from S3 and generate parameters of BoxApi
    const s3_read_params = {
        Key: fileName,
        Bucket: bucketName,
    };
    var next_position = null;
    var box_params = {
        stream_type: 'admin_logs',
        limit: 500
    }

    try {
        const res = await s3.getObject(s3_read_params).promise();
        next_position = res.Body.toString('ascii');
        box_params.stream_position = next_position;
    } catch(err) {
        console.error(err);
        box_params.created_after = process.env.BOX_START_DATE;
    }

    // Call BoxApi
    client.events.get(box_params, function(err, stream) {
        if (err) {
            console.log("error");
        }
    }).then(event => {
        var next_position = event.next_stream_position;
        // Send to Elasticsearch
        if (event.chunk_size != 0){
            sendToES(event.entries);
        }
        // Upload the next_position file to S3
        var params = {
            Key: fileName,
            Body: next_position,
            Bucket: bucketName,
            ContentType: contentType,
        };
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log("Error uploading data: ", err);
            } else {
                console.log("Successfully uploaded data to " + bucketName + "/" + fileName);
            }
        });
    });
}

// bulk send to Elasticsearch
function sendToES(records){
    var searchRecords = [];
    for(var i = 0; i < records.length; i++){
        var record = records[i];
        var header = {
            "index":{
                "_index": ES_INDEX,
                "_type": ES_TYPE,
            }
        };
        var searchRecord = {};
        searchRecords.push(header);
        searchRecords.push(record);
    };
    ES_CLIENT.bulk({
        "body": searchRecords
    }, function(err, resp){
        if(err){
            console.log(err);
        }else{
            console.log(resp);
        };
    });
};