import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useComment {
  reviewComment: CommentData[];
  setReviewComment: (reviewComment: CommentData) => void;
  setDeleteReviewComment: (review: CommentData[]) => void;
  qnaComment: CommentData[];
  setQnaComment: (qnaComment: CommentData) => void;
  setDeleteQnaComment: (qna: CommentData[]) => void;
}

export const useComment = create(
  persist<useComment>(
    (set) => ({
      reviewComment: [],
      setReviewComment: (reviewComment) =>
        set((state) => ({ reviewComment: [...state.reviewComment, reviewComment] })),
      setDeleteReviewComment: (reviewComment) => set({ reviewComment }),
      qnaComment: [],
      setQnaComment: (qnaComment) =>
        set((state) => ({ qnaComment: [...state.qnaComment, qnaComment] })),
      setDeleteQnaComment: (qnaComment) => set({ qnaComment }),
    }),
    {
      name: 'commentStore',
    }
  )
);