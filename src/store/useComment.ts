import { create } from 'zustand';

interface useComment {
  qna: QnaReviewData[];
  setQna: (comment: QnaReviewData) => void;
  setDeleteQna: (qna: QnaReviewData[]) => void;
  review: QnaReviewData[];
  setReview: (comment: QnaReviewData) => void;
  setDeleteReview: (qna: QnaReviewData[]) => void;
}

export const useComment = create<useComment>((set) => ({
  qna: [],
  setQna: (comment) => set((state) => ({ qna: [...state.qna, comment] })),
  setDeleteQna: (qna) => set({ qna }),
  review: [],
  setReview: (comment) => set((state) => ({ review: [...state.review, comment] })),
  setDeleteReview: (review) => set({ review })
}));