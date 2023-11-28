import { create } from 'zustand';

interface useData {
  // 전체 데이터
  data: Data[];
  setData: (data: Data[]) => void;
  // 페이지네이션 데이터
  pageData: Data[];
  setPageData: (pageData: Data[]) => void;
  // 전체 데이터 페이지 길이
  dataLengthPage: number;
  setDataLengthPage: (dataLengthPage: number | undefined) => void;
  // 전체 데이터 길이
  dataLength: number;
  setDataLength: (dataLength: number | undefined) => void;
  // 선택한 데이터
  selectData: Data | null;
  setSelectData: (data: Data | null) => void;
  // 선택한 데이터 아이디
  selectId: number | null;
  setSelectId: (selectId: number | null) => void;
  // 모달 열고 닫기
  modal: boolean;
  setModal: (modal: boolean) => void;
  // 페이지 넘버 기억하기
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  // 주문목록 데이터
  orderData: OrderData[];
  setOrderData: (order: OrderData[]) => void;
  // 선택한 주문데이터 아이디
  selectOrderId: number | null;
  setSelectOrderId: (selectOrderId: number | null) => void;
}

export const useData = create<useData>((set) => ({
  data: [],
  setData: (data) => set({ data }),
  pageData: [],
  setPageData: (pageData) => set({ pageData }),
  dataLengthPage: 0,
  setDataLengthPage: (dataLengthPage) => set({ dataLengthPage }),
  dataLength: 0,
  setDataLength: (dataLength) => set({ dataLength }),
  selectData: null,
  setSelectData: (selectData) => set({ selectData }),
  selectId: null,
  setSelectId: (selectId) => set({ selectId }),
  modal: false,
  setModal: (modal) => set({ modal }),
  pageNumber: 1,
  setPageNumber: (pageNumber) => set({ pageNumber }),
  orderData: [],
  setOrderData: (orderData) => set({ orderData }),
  selectOrderId: null,
  setSelectOrderId: (selectOrderId) => set({ selectOrderId }),
}));