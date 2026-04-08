import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import HalamanEditor from "@/pages/editor";
import { describe, it, expect } from "@jest/globals";

describe("Editor Page", () => {
  it("renders the editor page heading", () => {
    render(<HalamanEditor />);
    expect(screen.getByText("Halaman Editor")).toBeInTheDocument();
  });

  it("renders the welcome text", () => {
    render(<HalamanEditor />);
    expect(
      screen.getByText("Selamat datang di halaman editor!")
    ).toBeInTheDocument();
  });

  it("renders the editor container with correct class", () => {
    const { container } = render(<HalamanEditor />);
    expect(container.querySelector(".editor")).toBeInTheDocument();
  });
});
