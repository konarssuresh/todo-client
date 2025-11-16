import { useEffect } from "react";
import "./App.css";
import clsx from "clsx";
import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/login/login.jsx";
import Todos from "./pages/todos/todos.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // keep daisyui theme in sync and toggle tailwind's dark class
    // daisyui reads `data-theme` attribute on <html> / <body>
    document.documentElement.dataset.theme =
      theme === "dark" ? "dark" : "light";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div>
      <section
        className={clsx(
          "fixed top-0 left-0 w-full h-50 bg-no-repeat bg-cover bg-[url(./assets/images/bg-mobile-light.jpg)]",
          // tab specific style
          "md:h-75 md:bg-[url(./assets/images/bg-desktop-light.jpg)]",
          // desktop style
          "lg:[url(./assets/images/bg-desktop-light.jpg)]",
          "-z-10"
        )}
      />
      <div className="z-4">
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
