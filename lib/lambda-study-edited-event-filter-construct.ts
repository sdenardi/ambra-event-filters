import { Construct } from 'constructs'; 
import {
  aws_lambda_nodejs,
  aws_lambda,
  Duration
} from 'aws-cdk-lib';
import { AmbraEventFilterStackConstructProps } from './ambra-event-filters-stack';

export interface LambdaStudyEditedEventFilterConstructProps {
  studyEditedEndpointUrl: string;
}
interface ConstructProps extends LambdaStudyEditedEventFilterConstructProps, AmbraEventFilterStackConstructProps { }
export class LambdaStudyEditedEventFilterConstruct extends Construct {
  public readonly lambdaFunction: aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string, props: ConstructProps) {
    super(scope, id);

    const functionName = `AmbraStudyEditedEventFilter-${props.stackId}`;
    const functionDescription = 'Ambra "Study Edited" event filter.';
    const lambdaPath = './src/lambda/AmbraStudyEditedEventFilter/lambda-function.ts';
    const lambdaFunction = new aws_lambda_nodejs.NodejsFunction(this, 'lambda-event-handler', {
      functionName: functionName,
      description: functionDescription,
      environment: {
        ENDPOINT_URL: props.studyEditedEndpointUrl
      },
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      timeout: Duration.seconds(30),
      entry: lambdaPath,
      handler: "lambdaHandler"
    });
    
    lambdaFunction.addFunctionUrl({
      authType: aws_lambda.FunctionUrlAuthType.NONE
    });

    this.lambdaFunction = lambdaFunction;
  }
}