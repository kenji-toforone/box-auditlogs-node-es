zip -r box-auditlogs-node-es.zip index.js node_modules
aws s3 cp ./box-auditlogs-node-es.zip s3://[mybucket]/box-auditlogs-node-es.zip --profile [myprofile]
aws lambda update-function-code --function-name box-auditlogs-node-es --s3-bucket [mybucket] --s3-key box-auditlogs-node-es.zip --publish --profile [myprofile]
