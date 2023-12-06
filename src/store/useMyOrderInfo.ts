import { create } from 'zustand';

interface myOrderInfo {
  myOrderInfo: object;
  setMyOrderInfo: (val: object) => void;
}
export const useMyOrderInfo = create<myOrderInfo>((set) => ({
  myOrderInfo: {},
  setMyOrderInfo: (val) => set({ myOrderInfo: val }),
}));
