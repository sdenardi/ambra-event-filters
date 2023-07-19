import { Construct } from 'constructs'; 
import {
  Stack,
  StackProps
} from 'aws-cdk-lib';
import { LambdaStudyEditedEventFilterConstruct, LambdaStudyEditedEventFilterConstructProps } from './lambda-study-edited-event-filter-construct';

export interface AmbraEventFilterStackConstructProps {
  stackId: string;
}
interface AmbraEventFilterStackProps extends
  StackProps,
  LambdaStudyEditedEventFilterConstructProps { }
export class AmbraEventFilterStack extends Stack {
  constructor(scope: Construct, id: string, props: AmbraEventFilterStackProps) {
    super(scope, id, props);

    new LambdaStudyEditedEventFilterConstruct(this, 'lambda-study-edited', {
      ...props,
      stackId: id
    });
  }
}
