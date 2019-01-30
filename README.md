# box-auditlogs-node-es
AWS Lambda function to get Audit logs from Box API and save in AWS ElasticSearch.

# Dependency
Node.js v8.10 以上

* ローカルで動作確認する場合
    * "aws-sdk": "^2.395.0"
    * "box-node-sdk": "^1.6.0"
    * "dotenv": "^6.2.0"
    * "elasticsearch": "^15.3.1"

# Usage
## Local Setup
```$xslt
npm install --save aws-sdk box-node-sdk dotenv elasticsearch
```

## Local Setup
```$xslt
node -r dotenv/config main.js
```

## Deploy from local to AWSLambda
```$xslt
zip -r box-auditlogs-node-es.zip index.js node_modules
aws s3 cp ./box-auditlogs-node-es.zip s3://[mybucket]/box-auditlogs-node-es.zip --profile [myprofile]
aws lambda update-function-code --function-name box-auditlogs-node-es --s3-bucket [mybucket] --s3-key box-auditlogs-node-es.zip --publish --profile [myprofile]
```

# Licence
This software is released under the MIT License, see LICENSE.

# Authors
作者を明示する。特に、他者が作成したコードを利用する場合は、そのコードのライセンスに従った上で、リポジトリのそれぞれのコードのオリジナルの作者が誰か分かるように明示する（私はそれが良いと思い自主的にしています）。

# References
参考にした情報源（サイト・論文）などの情報、リンク