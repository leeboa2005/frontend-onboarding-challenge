import { create } from 'zustand';
import { Todo } from '../types/todo';

interface TodoState {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    addTodo: (todo: Todo) => void;
    updateTodo: (updatedTodo: Todo) => void;
    deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    updateTodo: (updatedTodo) =>
        set((state) => ({
            todos: state.todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
        })),
    deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}));
