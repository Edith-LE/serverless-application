import * as uuid from 'uuid'

import {TodoItem} from '../models/TodoItem'
import {TodoAccess} from '../dataLayer/todosAccess'
import {CreateTodoRequest} from '../requests/CreateTodoRequest'

const todoAccess = new TodoAccess() 


export async function createTodo(
  createTodoRequest: CreateTodoRequest
  
  ):Promise<TodoItem>{
    
  const itemId = uuid.v4()
  
  return await todoAccess.createTodo({
    todoId: itemId,
    createdAt: new Date().toISOString(),
    done: false,
    ...createTodoRequest
  })
}