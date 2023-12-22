import { create } from 'zustand';

interface myOrderInfo {
  myOrderInfo: MyOrderInfoType[];
  setMyOrderInfo: (val: MyOrderInfoType[]) => void;
  myOrderProductInfo: object[];
  setMyOrderProductInfo: (val: object[]) => void;
}

export const useMyOrderInfo = create<myOrderInfo>((set) => ({
  myOrderInfo: [],
  setMyOrderInfo: (val) => set({ myOrderInfo: val }),
  myOrderProductInfo: [],
  setMyOrderProductInfo: (val) => set({ myOrderProductInfo: val }),
}));
