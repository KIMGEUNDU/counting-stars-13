import { create } from 'zustand';

type myOrderInfoProducts = {
  state: string;
};

type myOrderInfoType = {
  createdAt: Date;
  products: myOrderInfoProducts[];
};

interface myOrderInfo {
  myOrderInfo: myOrderInfoType[];
  setMyOrderInfo: (val: myOrderInfoType[]) => void;
  myOrderProductInfo: object[];
  setMyOrderProductInfo: (val: object[]) => void;
}
export const useMyOrderInfo = create<myOrderInfo>((set) => ({
  myOrderInfo: [],
  setMyOrderInfo: (val) => set({ myOrderInfo: val }),
  myOrderProductInfo: [],
  setMyOrderProductInfo: (val) => set({ myOrderProductInfo: val }),
}));
