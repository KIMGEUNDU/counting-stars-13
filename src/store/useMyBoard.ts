import { create } from 'zustand';

interface useMyBoard {
  // 전체 데이터
  allData: Replies[];
  setAllData: (data: Replies[]) => void;
  // 페이지네이션 데이터
  pageData: Replies[];
  setPageData: (pageData: Replies[]) => void;
  // 전체 데이터 길이
  dataLength: number;
  setDataLength: (dataLength: number | undefined) => void;
  // 페이지 데이터 길이
  dataLengthPage: number;
  setDataLengthPage: (dataLengthPage: number | undefined) => void;
  // 페이지 넘버 기억하기
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

export const useMyBoard = create<useMyBoard>((set) => ({
  allData: [],
  setAllData: (allData) => set({ allData }),
  pageData: [],
  setPageData: (pageData) => set({ pageData }),
  dataLength: 0,
  setDataLength: (dataLength) => set({ dataLength }),
  dataLengthPage: 0,
  setDataLengthPage: (dataLengthPage) => set({ dataLengthPage }),
  pageNumber: 1,
  setPageNumber: (pageNumber) => set({ pageNumber }),
}));