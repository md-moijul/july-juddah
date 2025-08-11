import { create } from 'zustand';

export interface User {
    id?: string;
    name: string;
    town: string;
    phone?: string;
}

interface UserState {
    user: User;
    loading: boolean;
    setUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
    setUserName: (name: string) => void;
    setUserTown: (town: string) => void;
    setUserPhone: (phone: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: {
        name: '',
        town: '',
        phone: ''
    },
    loading: true,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setUserName: (name) => set((state) => ({ user: { ...state.user, name } })),
    setUserTown: (town) => set((state) => ({ user: { ...state.user, town } })),
    setUserPhone: (phone) => set((state) => ({ user: { ...state.user, phone } }))
}));
