import { create } from 'zustand';

interface deliveryState {
  isDeliveryState: string;
  setDeliveryState: (val: string) => void;
  isFindDeliveryState: string;
  setFindDeliveryState: (val: string) => void;
}
export const useDeliveryState = create<deliveryState>((set) => ({
  isDeliveryState: '',
  setDeliveryState: (val) => set({ isDeliveryState: val }),
  isFindDeliveryState: '전체 주문 처리 상태',
  setFindDeliveryState: (val: string) => set({ isFindDeliveryState: val }),
}));
