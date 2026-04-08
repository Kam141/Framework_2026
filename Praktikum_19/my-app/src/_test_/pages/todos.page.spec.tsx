import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import { jest, describe, it, beforeEach, expect } from "@jest/globals";
import useSWR from "swr";

jest.mock("swr");

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

import TodosPage from "@/pages/todos";

describe("Todos page wrapper", () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockClear();
  });

  it("calls useSWR with the todos API endpoint", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: null, error: null, isLoading: true });

    render(<TodosPage />);

    expect(useSWR).toHaveBeenCalledWith("/api/todos/", expect.any(Function));
  });

  it("passes loaded todos into the view component", () => {
    const mockData = {
      data: [
        { id: "1", name: "Todo 1", priority: "High", completed: false },
        { id: "2", name: "Todo 2", priority: "Low", completed: true },
      ],
    };

    (useSWR as jest.Mock).mockReturnValue({ data: mockData, error: null, isLoading: false });

    render(<TodosPage />);

    expect(screen.getByText("Daftar Todos")).toBeInTheDocument();
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });

  it("renders todos skeleton when the request fails", () => {
    (useSWR as jest.Mock).mockReturnValue({ data: null, error: new Error("Failed"), isLoading: false });

    const { container } = render(<TodosPage />);

    expect(screen.getByText("Daftar Todos")).toBeInTheDocument();
    expect(container.querySelector(".todos__content__skeleton")).toBeInTheDocument();
  });
});
