import "@testing-library/jest-dom/jest-globals";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

import useSWR from "swr";

jest.mock("swr");

import { render, screen } from "@testing-library/react";
import TodosPage from "@/pages/todos";

describe("Todos Page", () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockClear();
  });

  it("renders correctly on loading state", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<TodosPage />);
    expect(screen.getByText("Daftar Todos")).toBeInTheDocument();
  });

  it("renders correctly with loaded data", () => {
    // According to TampilanTodos component, it requires 'id', 'name', 'priority', 'completed'
    const mockData = {
      data: [
        { id: 1, name: "Test Todo 1", priority: "High", completed: false },
        { id: 2, name: "Test Todo 2", priority: "Low", completed: true },
      ],
    };

    (useSWR as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    render(<TodosPage />);
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });
});
