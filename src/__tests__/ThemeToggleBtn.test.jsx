import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ThemeToggleBtn from "../components/ThemeToggleBtn";

describe("ThemeToggleBtn Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove("dark-mode");
  });

  it("should render the button with correct initial text", () => {
    render(<ThemeToggleBtn />);
    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();
  });

  it("should toggle theme on button click", () => {
    render(<ThemeToggleBtn />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(button).toHaveTextContent("Switch to Light Mode");
    expect(document.body.classList.contains("dark-mode")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(button);
    expect(button).toHaveTextContent("Switch to Dark Mode");
    expect(document.body.classList.contains("dark-mode")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("should apply dark mode if previously set in localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeToggleBtn />);
    const button = screen.getByRole("button", {
      name: /switch to light mode/i,
    });

    expect(button).toBeInTheDocument();
    expect(document.body.classList.contains("dark-mode")).toBe(true);
  });

  it("should apply light mode if previously set in localStorage", () => {
    localStorage.setItem("theme", "light");
    render(<ThemeToggleBtn />);
    const button = screen.getByRole("button", { name: /switch to dark mode/i });

    expect(button).toBeInTheDocument();
    expect(document.body.classList.contains("dark-mode")).toBe(false);
  });
});
