export interface Todo {
    id: string | number;
    userId?: number;
    title: string;
    completed: boolean;
}

export interface CreateTodo {
    title: string;
    completed: boolean;
}

export interface UpdateTodo {
    title?: string;
    completed?: boolean;
}
