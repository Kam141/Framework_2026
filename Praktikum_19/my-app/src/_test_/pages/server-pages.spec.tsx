import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import { jest, describe, it, beforeEach, expect } from "@jest/globals";

jest.mock("@/views/DetailProduk", () => ({
  __esModule: true,
  default: () => <div>Mock DetailProduk</div>,
}));
jest.mock("@/views/DetailProduk/index", () => ({
  __esModule: true,
  default: () => <div>Mock DetailProduk</div>,
}));
jest.mock("@/views/detailTodos", () => ({
  __esModule: true,
  default: () => <div>Mock DetailTodo</div>,
}));
jest.mock("@/views/detailTodos/index", () => ({
  __esModule: true,
  default: () => <div>Mock DetailTodo</div>,
}));
jest.mock("@/views/produk", () => ({
  __esModule: true,
  default: () => <div>Mock Produk View</div>,
}));
jest.mock("@/views/produk/index", () => ({
  __esModule: true,
  default: () => <div>Mock Produk View</div>,
}));
jest.mock("@/views/todos", () => ({
  __esModule: true,
  default: () => <div>Mock Todos View</div>,
}));
jest.mock("@/views/todos/index", () => ({
  __esModule: true,
  default: () => <div>Mock Todos View</div>,
}));

// Prevent Next.js Image from causing errors during tests.
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <div>{props.alt || "NextImage"}</div>,
}));

import HalamanProdukDetail, { getServerSideProps as getProdukDetailProps } from "@/pages/produk/[id]";
import HalamanTodoDetail, { getServerSideProps as getTodoDetailProps } from "@/pages/todos/[todos]";
import HalamanProdukServer, { getServerSideProps as getProdukServerProps } from "@/pages/produk/server";
import HalamanTodoServer, { getServerSideProps as getTodoServerProps } from "@/pages/todos/server";

describe("Dynamic and server pages coverage", () => {
  beforeEach(() => {
    (global as any).fetch = jest.fn();
  });

  it("defines produk detail page component", () => {
    expect(typeof HalamanProdukDetail).toBe("function");
  });

  it("getServerSideProps for produk detail returns product props", async () => {
    (global as any).fetch.mockResolvedValue({
      json: async () => ({ data: [{ id: "1", name: "Test Product" }] }),
    });

    const result = await getProdukDetailProps({ params: { id: "1" } } as any);

    expect(result).toEqual({
      props: {
        products: { id: "1", name: "Test Product" },
      },
    });
  });

  it("getServerSideProps for produk detail returns notFound when data missing", async () => {
    (global as any).fetch.mockResolvedValue({ json: async () => ({ data: null }) });

    const result = await getProdukDetailProps({ params: { id: "1" } } as any);

    expect(result).toEqual({ notFound: true });
  });

  it("defines todo detail page component", () => {
    expect(typeof HalamanTodoDetail).toBe("function");
  });

  it("getServerSideProps for todo detail returns todo props", async () => {
    (global as any).fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: { id: "1", title: "Test Todo" } }),
    });

    const result = await getTodoDetailProps({ params: { todos: "1" } } as any);

    expect(result).toEqual({
      props: {
        todos: { id: "1", title: "Test Todo" },
      },
    });
  });

  it("getServerSideProps for todo detail returns notFound when response is not ok", async () => {
    (global as any).fetch.mockResolvedValue({ ok: false });

    const result = await getTodoDetailProps({ params: { todos: "1" } } as any);

    expect(result).toEqual({ notFound: true });
  });

  it("defines produk server page component", () => {
    expect(typeof HalamanProdukServer).toBe("function");
  });

  it("getServerSideProps for produk server returns props", async () => {
    (global as any).fetch.mockResolvedValue({
      json: async () => ({ data: [{ id: "1", name: "Server Product" }] }),
    });

    const result = await getProdukServerProps();

    expect(result).toEqual({
      props: {
        products: [{ id: "1", name: "Server Product" }],
      },
    });
  });

  it("returns notFound for produk detail when fetch throws", async () => {
    (global as any).fetch.mockRejectedValue(new Error("Network error"));

    const result = await getProdukDetailProps({ params: { id: "1" } } as any);

    expect(result).toEqual({ notFound: true });
  });

  it("renders todo detail fallback when no todo prop is passed", () => {
    render(<HalamanTodoDetail todos={null as any} />);

    expect(screen.getByText("Data todo tidak ditemukan")).toBeInTheDocument();
  });

  it("getServerSideProps for todo detail returns null todo on fetch error", async () => {
    (global as any).fetch.mockRejectedValue(new Error("Failed network"));

    const result = await getTodoDetailProps({ params: { todos: "1" } } as any);

    expect(result).toEqual({ props: { todos: null } });
  });
});
