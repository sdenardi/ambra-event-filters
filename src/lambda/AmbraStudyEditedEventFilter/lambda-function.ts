import { Handler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const lambdaHandler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async function(event) {
  const body = event.body;
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing body' })
    };
  }
  let parsedBody;
  try {
    parsedBody = JSON.parse(body);
  } catch(err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Malformed body' })
    };
  }

  const isValid = (
    parsedBody.OriginalMRN &&
    parsedBody.PatientId &&
    parsedBody.PatientId !== parsedBody.OriginalMRN
  );

  if (isValid && process.env.ENDPOINT_URL) {
    try {
      await fetch(process.env.ENDPOINT_URL, {
        method: 'POST',
        body: body,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch(err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error sending event' })
      };
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Ok' })
  };
};
