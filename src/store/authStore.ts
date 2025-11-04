
import { create } from 'zustand';
import { AuthState } from '../../types';


export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    userLoading: false,
    setUser: (user) => set({ user }),
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUserLoading: (value) => set({ userLoading: value }),
    logout: () => set({ user: null, isAuthenticated: false }),
}));
