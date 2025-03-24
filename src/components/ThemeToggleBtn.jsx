import { useEffect, useState } from "react";

const ThemeToggleBtn = () => {
  const getInitialTheme = () => localStorage.getItem("theme") === "dark";

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button className="themeToggleBtn" onClick={toggleTheme}>
      Switch to {isDarkMode ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggleBtn;
