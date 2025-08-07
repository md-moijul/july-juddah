import { create } from 'zustand';

interface User {
    id?: string;
    name?: string;
    town?: string;
    phone?: string;
}

interface UserState {
    user: User;
    loading: boolean;
    setUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
    setUserName: (name: string) => void;
    setUserTown: (town: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: {},
    loading: true,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setUserName: (name) => set((state) => ({ user: { ...state.user, name } })),
    setUserTown: (town) => set((state) => ({ user: { ...state.user, town } })),
}));
