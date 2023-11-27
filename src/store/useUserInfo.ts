import { create } from 'zustand';

interface UserInfo {
  userInfo: object | null;
  setUserInfo: (val: object) => void;
}
export const useUserInfo = create<UserInfo>((set) => ({
  userInfo: {},
  setUserInfo: (val) => set({ userInfo: val }),
}));
