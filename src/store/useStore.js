import { create } from "zustand";

export const useStore = create((set) => ({
  isCollapsed: false,
  isLogined: localStorage.getItem("isLogined") === "true",
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  login: (email, password) => {
    if (email === "admin" && password === "admin") {
      set(() => ({ isLogined: true }));
      localStorage.setItem("isLogined", true);
    }
  },
  logout: () => {
    set(() => ({ isLogined: false }));
    localStorage.setItem("isLogined", false);
  },
}));
