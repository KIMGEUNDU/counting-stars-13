import { create } from 'zustand';

interface useComment {
  qna: Pick<QnaReviewTable, 'writer' | 'date' | 'content' | 'writerId'>[];
  setQna: (comment: Pick<QnaReviewTable, 'writer' | 'date' | 'content' | 'writerId'>) => void;
  setDelete: (qna: Pick<QnaReviewTable, 'writer' | 'date' | 'content' | 'writerId'>[]) => void;
}

export const useComment = create<useComment>((set) => ({
  qna: [],
  setQna: (comment) => set((state) => ({ qna: [...state.qna, comment] })),
  setDelete: (qna) => set({ qna })
}));