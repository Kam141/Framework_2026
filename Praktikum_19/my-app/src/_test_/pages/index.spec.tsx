import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

describe("Home Page", () => {
  it("renders the home page text correctly", () => {
    // Next.js Link component renders an anchor tag but we just need standard render
    render(<Home />);
    
    expect(screen.getByText("Praktikum Next.js pages Router")).toBeInTheDocument();
    expect(screen.getByText("Mahasiswa D4 Pengembangan Web")).toBeInTheDocument();
  });
});
