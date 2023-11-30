import { create } from 'zustand';

type phoneNumber = {
  phoneFirst: string;
  phoneMiddle: string;
  phoneLast: string;
};

interface usePhoneNumber {
  isPhoneNumber: phoneNumber;
  setPhoneNumber: (val: phoneNumber) => void;
}

export const usePhoneNumber = create<usePhoneNumber>((set) => ({
  isPhoneNumber: {
    phoneFirst: '',
    phoneMiddle: '',
    phoneLast: '',
  },
  setPhoneNumber: (val) => set({ isPhoneNumber: val }),
}));
