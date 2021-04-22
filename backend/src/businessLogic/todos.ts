import * as uuid from 'uuid'

import {TodoItem} from '../models/TodoItem'
import {TodoAccess} from '../dataLayer/todosAccess'
import {CreateTodoRequest} from '../requests/CreateTodoRequest'
import {parseUserId} from '../auth/utils'

const todoAccess = new TodoAccess() 


export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  jwt: string
  
  ):Promise<TodoItem>{
    
  const itemId = uuid.v4()
  const userId = parseUserId(jwt)
  
  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userId,
    createdAt: new Date().toISOString(),
    done: false,
    ...createTodoRequest
  })
}