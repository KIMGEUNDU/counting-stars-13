import { create } from 'zustand';

interface useComment {
  comment: Replies[];
  setComment: (comment: Replies) => void;
  setDeleteComment: (qna: Replies[]) => void;
}

export const useComment = create<useComment>((set) => ({
  comment: [],
  setComment: (comment) => set((state) => ({ comment: [...state.comment, comment] })),
  setDeleteComment: (comment) => set({ comment }),
}));