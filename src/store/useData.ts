import { create } from 'zustand';

interface useData {
  // 전체 데이터
  data: Data[];
  setData: (data: Data[]) => void;
  // 전체 데이터 길이
  dataLength: number;
  setDataLength: (dataLength: number | undefined) => void;
  selectData: Data | null;
  setSelectData: (data: Data | null) => void;
  selectId: number | undefined;
  setSelectId: (selectId: number | undefined) => void;
  // 모달 열고 닫기
  modal: boolean;
  setModal: (modal: boolean) => void;
  // 페이지 넘버 기억하기
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

export const useData = create<useData>((set) => ({
  data: [],
  setData: (data) => set({ data }),
  dataLength: 0,
  setDataLength: (dataLength) => set({ dataLength }),
  selectData: null,
  setSelectData: (selectData) => set({ selectData }),
  selectId: 0,
  setSelectId: (selectId) => set({ selectId }),
  modal: false,
  setModal: (modal) => set({ modal }),
  pageNumber: 1,
  setPageNumber: (pageNumber) => set({ pageNumber }),
}));
