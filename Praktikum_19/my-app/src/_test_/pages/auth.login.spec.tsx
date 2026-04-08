import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { signIn } from "next-auth/react";

const mockUseRouter = jest.fn();

// Mock next/router sebelum render
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: mockUseRouter,
}));

jest.mock("next-auth/react");

// Mock SCSS module
jest.mock("@/views/auth/login/login.module.scss", () => ({
  login: "login",
  login__title: "login__title",
  login__form: "login__form",
  login__form__item: "login__form__item",
  login__form__item__label: "login__form__item__label",
  login__form__item__input: "login__form__item__input",
  login__form__item__button: "login__form__item__button",
  login__form__item__text: "login__form__item__text",
  login__error: "login__error",
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TampilanLogin from "@/views/auth/login";

describe("TampilanLogin Component", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      query: {},
    });
    (signIn as jest.Mock).mockClear();
  });

  it("renders login page heading", () => {
    render(<TampilanLogin />);
    expect(screen.getByText("Halaman login")).toBeInTheDocument();
  });

  it("renders email and password inputs", () => {
    render(<TampilanLogin />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("renders login button", () => {
    render(<TampilanLogin />);
    expect(screen.getByText("login")).toBeInTheDocument();
  });

  it("renders sign in with google button", () => {
    render(<TampilanLogin />);
    expect(screen.getByText("sign in with google")).toBeInTheDocument();
  });

  it("renders sign in with github button", () => {
    render(<TampilanLogin />);
    expect(screen.getByText("sign in with github")).toBeInTheDocument();
  });

  it("renders link to register page", () => {
    render(<TampilanLogin />);
    expect(screen.getByText("Ke Halaman Register")).toBeInTheDocument();
  });

  it("shows Loading... on submit while loading", async () => {
    (signIn as jest.Mock).mockImplementation(
      () =>
        new Promise<any>((resolve) =>
          setTimeout(() => resolve({ error: null, ok: true, status: 200, url: "/" }), 500)
        )
    );

    render(<TampilanLogin />);

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password" } });
    fireEvent.submit(screen.getByRole("button", { name: "login" }).closest("form")!);

    await waitFor(() => {
      expect(screen.getAllByText("Loading...").length).toBeGreaterThan(0);
    });
  });


});
