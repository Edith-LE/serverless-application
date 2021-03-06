import * as uuid from 'uuid'

import {TodoItem} from '../models/TodoItem'
import {TodoAccess} from '../dataLayer/todosAccess'
import {CreateTodoRequest} from '../requests/CreateTodoRequest'
import {UpdateTodoRequest} from '../requests/UpdateTodoRequest'
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

export async function updateTodo(
  updateTodoRequest: UpdateTodoRequest,
  jwt: string
): Promise<TodoItem> {

  const userId = parseUserId(jwt)
  return await todoAccess.updateTodo({userId, ...updateTodoRequest})
  
}

export async function getTodos(
  jwt: string
  ):Promise <TodoItem[]>{
  const userId = parseUserId(jwt)
  return await todoAccess.getTodos({userId})
}

export async function deleteTodo(
  todoId: string,
  jwt: string
):Promise<TodoItem>{
  const userId = parseUserId(jwt)
  return await todoAccess.deleteTodo({userId, todoId})
}

export async function updateAttachmentUrl(
  todoId: string,
  imageUrl: string,
  jwt:string
):Promise <TodoItem>{
  const userId = parseUserId(jwt)
  return await todoAccess.updateAttachmentUrl({userId, todoId, imageUrl})
}