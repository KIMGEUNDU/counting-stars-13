import { create } from 'zustand';

type loginInfo = {
  email: string;
  password: string;
};

interface useLoginInfo {
  isLoginInfo: loginInfo;
  setLoginInfo: (val: loginInfo) => void;
}

export const useLoginInfo = create<useLoginInfo>((set) => ({
  isLoginInfo: {
    email: '',
    password: '',
  },
  setLoginInfo: (val) => set({ isLoginInfo: val }),
}));

interface useLogin {
  isLogin: boolean;
  setLogin: (val: boolean) => void;
}
export const useLogin = create<useLogin>((set) => ({
  isLogin: false,
  setLogin: (val) => set({ isLogin: val }),
}));
