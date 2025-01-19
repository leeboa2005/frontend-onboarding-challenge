import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import todoAxios from '../api/todoAxios';
import { Todo, UpdateTodo } from '../types/todo';

export const useTodos = () => {
    return useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await todoAxios.get('/todos', {
                params: { _limit: 10 },
            });
            return response.data;
        },
    });
};

export const usePersistentLocalTodos = () => {
    const [localTodos, setLocalTodos] = useState<Todo[]>(() => {
        const storedTodos = localStorage.getItem('localTodos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    const syncWithLocalStorage = (todos: Todo[]) => {
        localStorage.setItem('localTodos', JSON.stringify(todos));
        setLocalTodos(todos);
    };

    const addLocalTodo = (todo: Todo) => {
        const updatedTodos = [...localTodos, todo];
        syncWithLocalStorage(updatedTodos);
    };

    const updateLocalTodo = (id: string | number, data: UpdateTodo) => {
        const updatedTodos = localTodos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo));
        syncWithLocalStorage(updatedTodos);
    };

    const deleteLocalTodo = (id: string | number) => {
        const updatedTodos = localTodos.filter((todo) => todo.id !== id);
        syncWithLocalStorage(updatedTodos);
    };

    return { localTodos, addLocalTodo, updateLocalTodo, deleteLocalTodo };
};
