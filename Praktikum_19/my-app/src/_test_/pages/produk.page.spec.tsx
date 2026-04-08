import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import { jest, describe, it, beforeEach, expect } from "@jest/globals";
import useSWR from "swr";

jest.mock("swr");

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

import KategoriPage from "@/pages/produk";

describe("Produk page wrapper", () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockClear();
  });

  it("calls useSWR with the produk API endpoint", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: null, error: null, isLoading: true });

    render(<KategoriPage />);

    expect(useSWR).toHaveBeenCalledWith("/api/produk", expect.any(Function));
  });

  it("passes loaded products into the view component", () => {
    const mockData = {
      data: [
        { id: "1", name: "Baju Koko", price: 150000, category: "Pakaian", image: "/images/baju.png" },
        { id: "2", name: "Celana Panjang", price: 200000, category: "Pakaian", image: "/images/celana.png" },
      ],
    };

    (useSWR as jest.Mock).mockReturnValue({ data: mockData, error: null, isLoading: false });

    render(<KategoriPage />);

    expect(screen.getByText("Daftar Produk")).toBeInTheDocument();
    expect(screen.getByText("Baju Koko")).toBeInTheDocument();
    expect(screen.getByText("Celana Panjang")).toBeInTheDocument();
  });

  it("renders skeleton content when no products are available", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: null, error: new Error("Failed"), isLoading: false });

    const { container } = render(<KategoriPage />);

    expect(screen.getByText("Daftar Produk")).toBeInTheDocument();
    expect(container.querySelector(".produk__content__skeleton")).toBeInTheDocument();
  });
});
