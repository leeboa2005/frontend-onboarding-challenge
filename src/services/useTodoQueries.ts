import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import todoAxios from '../api/todoAxios';
import { Todo, UpdateTodo } from '../types/todo';

// JSONPlaceholder에서 todos 가져오기
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

// 클라이언트에서 상태 관리하는 훅
export const usePersistentLocalTodos = () => {
    const queryClient = useQueryClient();
    const [localTodos, setLocalTodos] = useState<Todo[]>(() => {
        const storedTodos = localStorage.getItem('localTodos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    // localStorage와 상태 동기화
    const syncWithLocalStorage = (todos: Todo[]) => {
        localStorage.setItem('localTodos', JSON.stringify(todos));
        setLocalTodos(todos); // 상태 업데이트
        queryClient.setQueryData<Todo[]>(['localTodos'], todos); // 캐시 업데이트
    };

    // 새 할 일 추가
    const addLocalTodo = (todo: Todo) => {
        const updatedTodos = [...localTodos, todo];
        syncWithLocalStorage(updatedTodos);
    };

    // 할 일 수정
    const updateLocalTodo = (id: string | number, data: UpdateTodo) => {
        const updatedTodos = localTodos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo));
        syncWithLocalStorage(updatedTodos);
    };

    // 할 일 삭제
    const deleteLocalTodo = (id: string | number) => {
        const updatedTodos = localTodos.filter((todo) => todo.id !== id);
        syncWithLocalStorage(updatedTodos);
    };

    return { localTodos, addLocalTodo, updateLocalTodo, deleteLocalTodo };
};
