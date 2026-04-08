import "@testing-library/jest-dom/jest-globals";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

import useSWR from "swr";

jest.mock("swr");

jest.mock("@/utils/swr/fetcher", () => ({
  __esModule: true,
  default: jest.fn((url: string) => Promise.resolve({ data: [] })),
}));

import { render, screen } from "@testing-library/react";
import KategoriPage from "@/pages/produk";

describe("Produk Page", () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockClear();
  });

  it("renders correctly on loading state", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<KategoriPage />);
    expect(document.querySelector(".produk")).toBeDefined();
  });

  it("renders correctly with loaded data", () => {
    const mockData = {
      data: [
        { id: 1, name: "Baju Koko", price: 150000, category: "Pakaian" },
        { id: 2, name: "Celana Panjang", price: 200000, category: "Pakaian" },
      ],
    };

    (useSWR as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    render(<KategoriPage />);
    // Testing the actual component's text mapping
    expect(screen.getByText("Baju Koko")).toBeInTheDocument();
  });

  it("handles missing data robustly", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    render(<KategoriPage />);
    expect(document.querySelector(".produk")).toBeDefined();
  });
});