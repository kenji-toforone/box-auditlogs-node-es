var event = {
    "Records": [
        {
            "awsRegion": "ap-northeast-1",
            "sequenceNumber": "196800000000000000000374",
            "partitionKey": "khohohoihoihohoihoihohohohohoh",
            "eventSource": "aws:s3",
            "s3":{
                "bucket":{
                    "name":"chicken-bucket",
                    "arn":"bucket-ARN"
                },
                "object":{
                    "key":"tekito.jpg"
                }
            }
        }
    ]
};

var context = {
    invokeid: 'invokeid',
    done: function(err,message){
        return;
    }
};

var lambda = require("./index");
lambda.handler(event,context);