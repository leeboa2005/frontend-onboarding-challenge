import todoAxios from './todoAxios';
import { CreateTodo, Todo, UpdateTodo } from '../types/todo';

export const todoService = {
    getTodos: async (): Promise<Todo[]> => {
        const response = await todoAxios.get('/todos');
        return response.data.slice(0, 10);
    },

    getTodoById: async (id: string): Promise<Todo> => {
        const response = await todoAxios.get(`/todos/${id}`);
        return response.data;
    },

    createTodo: async (todo: CreateTodo): Promise<Todo> => {
        const response = await todoAxios.post('/todos', {
            ...todo,
            userId: 1,
        });
        return response.data;
    },

    updateTodo: async (id: string, todo: UpdateTodo): Promise<Todo> => {
        const response = await todoAxios.patch(`/todos/${id}`, todo);
        return response.data;
    },

    deleteTodo: async (id: string): Promise<void> => {
        await todoAxios.delete(`/todos/${id}`);
    },
};
