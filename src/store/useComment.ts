import { create } from 'zustand';

interface useComment {
  qna: Pick<QnaReviewTable, 'writer' | 'date' | 'content'>[];
  setQna: (comment: Pick<QnaReviewTable, 'writer' | 'date' | 'content'>) => void;
}

export const useComment = create<useComment>((set) => ({
  qna: [],
  setQna: (comment) => set((state) => ({ qna: [...state.qna, comment] })),
}));