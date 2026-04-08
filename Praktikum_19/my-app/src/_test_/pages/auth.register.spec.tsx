import "@testing-library/jest-dom/jest-globals";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TampilanRegister from "@/views/auth/register";

// 1. Mocking Next Router
const mockPush = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockPush,
    query: {},
  }),
}));

// 2. Mocking SCSS module
jest.mock("../../views/auth/register/register.module.scss", () => ({
  register: "register",
  register__title: "register__title",
  register__form: "register__form",
  register__form__item: "register__form__item",
  register__form__item__label: "register__form__item__label",
  register__form__item__input: "register__form__item__input",
  register__form__item__button: "register__form__item__button",
  register__form__item__text: "register__form__item__text",
  register__error: "register__error",
}));

describe("TampilanRegister Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Inisialisasi global.fetch sebagai jest mock
    (global as any).fetch = jest.fn();
  });

  // ===== RENDER TESTS =====
  it("renders all registration elements correctly", () => {
    render(<TampilanRegister />);
    
    expect(screen.getByText("Halaman Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Fullname")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("member");
    
    expect(screen.getByText("Ke Halaman Login")).toBeInTheDocument();
  });

  // ===== LOGIC TESTS =====

  it("redirects to /auth/login on successful registration", async () => {
    // Perbaikan: Pastikan mock response memiliki properti json()
    (global as any).fetch.mockResolvedValue({
  status: 200,
  ok: true,
  json: async () => ({ message: "success" }),
})

    render(<TampilanRegister />);

    // Mengisi form (Opsional tapi baik untuk integritas test)
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@mail.com" } });
    
    // Trigger submit
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/auth/login");
    });
  });

  it("shows 'Email already exists' error when status 400", async () => {
    (global as any).fetch.mockResolvedValue({
  status: 400,
  ok: false,
  json: async () => ({ message: "Email Already Exists" }),
})
    render(<TampilanRegister />);

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText("Email already exists")).toBeInTheDocument();
    });
  });

  it("shows 'An error occurred' for non-200/400 responses", async () => {
   (global as any).fetch.mockResolvedValue({
  status: 500,
  ok: false,
  json: async () => ({ message: "Internal Server Error" }),
})

    render(<TampilanRegister />);

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText("An error occurred")).toBeInTheDocument();
    });
  });
});