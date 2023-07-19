# ambra-event-filters

Ambra event filters. This project includes a Lambda functions to filter incoming events sent to our servers.

## study-edited-event-filter

This Lambda function inspects incoming `Study Edited` webhook events before forwarding them to an endpoint if considered valid. Such events are considered valid if

- `OriginalMRN` is present - the study has been processed
- `PatientId` is present - the study has an original value that can be compared 
- `PatientId !== OriginalMRN` - the study isn't being re-uploaded

### Testing

```sh
## OriginalMRN missing
curl -v -X POST \
  'https://abcdefg.lambda-url.us-east-1.on.aws/' \
  -H 'content-type: application/json' \
  -d '{"UUID":"UUID","PatientId":"PatientId","PatientName":"PatientName","EntityId":"EntityId","MemberFileId":"MemberFileId","OriginalMRN":"","StudyUID":"StudyUID"}'

## OriginalMRN present
curl -v -X POST \
  'https://abcdefg.lambda-url.us-east-1.on.aws/' \
  -H 'content-type: application/json' \
  -d '{"UUID":"UUID","PatientId":"PatientId","PatientName":"PatientName","EntityId":"EntityId","MemberFileId":"MemberFileId","OriginalMRN":"OriginalMRN","StudyUID":"StudyUID"}'
```

## Useful commands

The `cdk.json` file tells the CDK Toolkit how to execute your app.

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template