import { create } from "zustand";

interface MenuState {
  query: string | null;
  setQuery: (query: string | null) => void;
  filters: string[];
  setFilters: (filters: string[]) => void;
}

export const useMenuStore = create<MenuState>()((set) => ({
  query: "",
  setQuery: (query: string | null) => set({ query }),
  filters: [],
  setFilters: (filters: string[]) => set({ filters }),
}));
