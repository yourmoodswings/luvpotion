// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
  
    if (theme === "dark") {
      html.classList.add("bg-museum-texture", "text-[#fff6d8]");
      html.classList.remove("bg-white", "text-black");
    } else {
      html.classList.add("bg-white", "text-black");
      html.classList.remove("bg-museum-texture", "text-[#fff6d8]");
    }
  }, [theme]);
  

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
