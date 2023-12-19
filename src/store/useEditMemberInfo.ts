import { create } from 'zustand';

interface editMemberInfoState {
  editMemberInfo: editMemberInfo;
  setEditMemberInfo: (val: editMemberInfo) => void;
  isAddress: address;
  setAddress: (isAddress: address | undefined) => void;
}

export const useEditMemberInfo = create<editMemberInfoState>((set) => ({
  editMemberInfo: {
    email: '',
    name: '',
    phone: '',
    address: { zonecode: '', address: '', addressDetail: '' },
    type: '',
    emailAgree: false,
    birthday: '',
  },
  setEditMemberInfo: (val) => set({ editMemberInfo: val }),
  isAddress: {
    zonecode: '',
    address: '',
    addressDetail: '',
  },
  setAddress: (isAddress) => set({ isAddress }),
}));
