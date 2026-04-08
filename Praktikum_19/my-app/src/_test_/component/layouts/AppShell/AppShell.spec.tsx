import "@testing-library/jest-dom/jest-globals";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { useRouter } from "next/router";

const mockUseRouter = jest.fn();

// Define mock right at the top
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: mockUseRouter
}));

jest.mock("next-auth/react");

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => <div data-testid="mock-dynamic">Dynamic Component</div>;
  return DynamicComponent;
});

jest.mock("next/font/google", () => ({
  Roboto: () => ({
    className: "mocked-roboto-class",
  }),
}));

import { render, screen } from "@testing-library/react";
import AppShell from "@/components/layouts/AppShell";

describe("AppShell Component", () => {
  beforeEach(() => {
    mockUseRouter.mockClear();
  });

  it("renders children correctly", () => {
    mockUseRouter.mockReturnValue({
      pathname: "/",
    } as ReturnType<typeof useRouter>);

    render(
      <AppShell>
        <div data-testid="child">Test Child Content</div>
      </AppShell>
    );
    
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
  });
});
