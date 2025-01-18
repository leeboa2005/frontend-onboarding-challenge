import { create } from 'zustand';
import { User } from '../types/user';

interface AuthState {
    token: string | null;
    user: User | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    setToken: (token) => {
        localStorage.setItem('accessToken', token);
        set({ token });
    },
    setUser: (user) => set({ user }),
    logout: () => {
        localStorage.removeItem('accessToken');
        set({ token: null, user: null });
    },
}));
