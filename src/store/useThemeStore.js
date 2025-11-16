import { create } from "zustand";

function getInitialTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export const useThemeStore = create((set) => {
  const initialTheme = getInitialTheme();

  document.documentElement.classList.toggle("dark", initialTheme === "dark");
  document.documentElement.setAttribute("data-theme", initialTheme);
  localStorage.setItem("theme", initialTheme);

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      set({ theme });
    },
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        return { theme: newTheme };
      }),
  };
});
