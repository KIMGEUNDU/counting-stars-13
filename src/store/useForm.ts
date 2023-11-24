import { create } from 'zustand';

interface useForm {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  attachFile: string;
  setAttachFile: (attachFile: string) => void;
}

export const useForm = create<useForm>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
  content: '',
  setContent: (content) => set({ content }),
  attachFile: '',
  setAttachFile: (attachFile) => set({ attachFile }),
}));
