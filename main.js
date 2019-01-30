var event = {
    version: '0',
    id: 'XXXXXXXX-XXXXX-XXXX-XXXXX-XXXXXXXX',
    'detail-type': 'Scheduled Event',
    source: 'aws.events',
    account: 'XXXXXXXXXX',
    time: '2019-01-30T06:27:04Z',
    region: 'ap-northeast-1',
    resources:
        [ 'arn:aws:events:ap-northeast-1:XXXXXXXXXX:rule/box-auditlog-exec' ],
    detail: {}
};

var context = {
    invokeid: 'invokeid',
    done: function(err,message){
        return;
    }
};

var lambda = require("./index");
lambda.handler(event,context);