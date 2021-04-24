import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

import {TodoItem} from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
//import {TodoUpdate} from '../models/TodoUpdate'


export class TodoAccess{

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE) {
  }

  async createTodo(todo: TodoItem): Promise<TodoItem>{
    await this.docClient.put({
      TableName: this.todosTable,
      Item: todo
    }).promise()
    return todo
  }

  async updateTodo(todo:TodoUpdate): Promise<TodoItem>{
    await this.docClient.update({
      TableName: this.todosTable,
      Key:{
        todoId: todo.todoId
      },
      ExpressionAttributeNames:{"#N": "name"},
      UpdateExpression:"set #N = :todoName, dueDate = :dueDate, done = :done",
      ConditionExpression: "userId = :userId",
      ExpressionAttributeValues:{
        ":todoName": todo.name,
        ":dueDate": todo.dueDate,
        ":done": todo.done,
        ":userId": todo.userId
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()

    return todo as TodoItem
  }

}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}

