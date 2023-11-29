import { create } from 'zustand';

interface LoginUser {
  address: string;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  type: string;
  updatedAt: string;
  _id: number;
  extra?: object;
  emailAgree: boolean;
}

interface UserInfo {
  userInfo: LoginUser | null;
  setUserInfo: (userInfo: LoginUser | null) => void;
}

export const useUserInfo = create<UserInfo>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
