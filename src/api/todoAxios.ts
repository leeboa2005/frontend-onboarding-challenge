import axios from 'axios';

export const TODO_BASE_URL = import.meta.env.VITE_TODO_BASE_URL;

const todoApi = axios.create({
    baseURL: TODO_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default todoApi;
