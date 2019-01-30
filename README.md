# box-auditlogs-node-es
AWS Lambda function to get Audit logs from Box API and save in AWS ElasticSearch.

# Dependency
Node.js v8.10 higher is required

# Usage
## Local Setup
```$xslt
npm install --save aws-sdk box-node-sdk dotenv elasticsearch
```

## Set Environment
```$xslt
cp -a sample.env .env
vim .env
```
* Change the value to your environment
````$xslt
BOX_CONFIG={   "boxAppSettings": {     "clientID": ..... "   } }
BOX_START_DATE=2019-01-01T00:00:00+09:00
AWS_REGION=ap-northeast-1
S3_NEXT_POSITION_BUCKETNAME=mybucket
LOCAL=true
LOCAL_PROFILE=AWS_credentials_profile_name
ES_INDEX=Elasticsearch_Index_name
ES_TYPE=Elasticsearch_Type_name
ES_ENDPOINT=https://xxxxxxxxxxxxxxxx.ap-northeast-1.es.amazonaws.com/
````



## Local Exec
```$xslt
node -r dotenv/config main.js
```


## Deploy from local to AWSLambda (usin S3)
```$xslt
zip -r box-auditlogs-node-es.zip index.js node_modules
aws s3 cp ./box-auditlogs-node-es.zip s3://[mybucket]/box-auditlogs-node-es.zip --profile [myprofile]
aws lambda update-function-code --function-name box-auditlogs-node-es --s3-bucket [mybucket] --s3-key box-auditlogs-node-es.zip --publish --profile [myprofile]
```

# Licence
This software is released under the MIT License, see LICENSE.

# Authors
* [facebook](https://www.facebook.com/kenji.nishii.7)
* [twitter](https://twitter.com/kenji_toforone)

# References
* [box reference](https://developer.box.com/reference#get-events-in-an-enterprise
)
