import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface orderUserInfo {
  email: string;
  name: string;
  phone: string;
  address: address;
  subAddress: address;
}

interface orderUserInfoState {
  orderUserInfo: orderUserInfo;
  setOrderUserInfo: (orderUserInfo: orderUserInfo | undefined) => void;
  isAddress: address;
  setAddress: (isAddress: address | undefined) => void;
}

export const useOrderUserInfo = create(
  persist<orderUserInfoState>(
    (set) => ({
      orderUserInfo: {
        email: '',
        name: '',
        phone: '',
        address: { zonecode: '', address: '', addressDetail: '' },
        subAddress: { zonecode: '', address: '', addressDetail: '' },
      },
      setOrderUserInfo: (orderUserInfo) => set({ orderUserInfo }),
      isAddress: {
        zonecode: '',
        address: '',
        addressDetail: '',
      },
      setAddress: (isAddress) => set({ isAddress }),
    }),
    { name: 'user-info-storage' }
  )
);
