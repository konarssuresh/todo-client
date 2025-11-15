import { create } from "zustand";

export const TODO_OPTIONS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export const useToDoStore = create((set) => ({
  selectedMenu: TODO_OPTIONS.ALL,
  setSelectedMenu: (val) => set({ selectedMenu: val }),
}));
