import { render, screen } from "@testing-library/react";
import Footer from "@/components/layouts/footer";
import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

describe("Footer Component", () => {
  it("renders footer correctly", () => {
    render(<Footer />);
    
    expect(screen.getByText("Footer Component")).toBeInTheDocument();
  });
});
