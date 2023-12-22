import { create } from 'zustand';

interface JoinToLogin {
  joinToLogin: boolean;
  setJoinToLogin: (val: boolean) => void;
}
export const useJoinToLogin = create<JoinToLogin>((set) => ({
  joinToLogin: false,
  setJoinToLogin: (val) => set({ joinToLogin: val }),
}));
