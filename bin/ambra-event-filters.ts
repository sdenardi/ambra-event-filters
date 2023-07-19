#!/usr/bin/env node
import 'source-map-support/register';
import { AmbraEventFilterStack } from '../lib/ambra-event-filters-stack';
import { App } from 'aws-cdk-lib';

const env = { account: '450241406487', region: 'us-east-1' };

const app = new App();
new AmbraEventFilterStack(app, 'ambra-event-test', {
  env,
  studyEditedEndpointUrl: 'https://dev-sd.summusglobal.com/Ambra/StudyEdited'
});
