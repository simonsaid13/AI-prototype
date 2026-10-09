import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UIMessage } from 'ai';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ChatMessage = UIMessage<{ createdAt?: number }>;
export type Rating = 'up' | 'down';

export type Chat = {
  id: string;
  number: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
  ratings: Record<string, Rating>;
};

type ChatsState = {
  chats: Record<string, Chat>;
  currentId: string | null;
  startChat: (id: string, firstText: string) => void;
  saveMessages: (id: string, messages: ChatMessage[]) => void;
  selectChat: (id: string | null) => void;
  setRating: (chatId: string, messageId: string, rating: Rating | null) => void;
};

function ticketNumber() {
  return String(100000 + Math.floor(Math.random() * 900000));
}

export const useChats = create<ChatsState>()(
  persist(
    (set) => ({
      chats: {},
      currentId: null,
      startChat: (id, firstText) =>
        set((s) => {
          const now = Date.now();
          const chat: Chat = {
            id,
            number: ticketNumber(),
            title: firstText.replace(/\s+/g, ' ').trim(),
            createdAt: now,
            updatedAt: now,
            messages: [],
            ratings: {},
          };
          return { chats: { ...s.chats, [id]: chat }, currentId: id };
        }),
      saveMessages: (id, messages) =>
        set((s) => {
          const chat = s.chats[id];
          if (!chat) return s;
          return { chats: { ...s.chats, [id]: { ...chat, messages, updatedAt: Date.now() } } };
        }),
      selectChat: (id) => set({ currentId: id }),
      setRating: (chatId, messageId, rating) =>
        set((s) => {
          const chat = s.chats[chatId];
          if (!chat) return s;
          const ratings = { ...chat.ratings };
          if (rating) ratings[messageId] = rating;
          else delete ratings[messageId];
          return { chats: { ...s.chats, [chatId]: { ...chat, ratings } } };
        }),
    }),
    {
      name: 'chats',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ chats: s.chats }),
    },
  ),
);
