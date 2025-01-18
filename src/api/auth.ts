import api from './axios';

export const authAPI = {
    register: async (data: { id: string; password: string; nickname: string }) => {
        const response = await api.post('/register', data);
        return response.data;
    },

    login: async (data: { id: string; password: string }) => {
        const response = await api.post('/login', data);
        return response.data;
    },

    getUserProfile: async () => {
        const response = await api.get('/user');
        return response.data;
    },

    updateUserProfile: async (formData: FormData) => {
        const response = await api.patch('/profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
};
