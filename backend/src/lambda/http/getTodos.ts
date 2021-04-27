import 'source-map-support/register'

import {getTodos} from '../../businessLogic/todos'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  console.log(event);

  const auth = event.headers.Authorization
  const split = auth.split(' ')
  const jwt = split[1]

  const todos = await getTodos(jwt)

  return{
    statusCode: 201,
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: todos
    })
  } 
}

