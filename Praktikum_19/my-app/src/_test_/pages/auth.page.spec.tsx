import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import { describe, it } from "@jest/globals";

jest.mock("@/views/auth/login", () => () => <div>Mock Login View</div>);
jest.mock("@/views/auth/register", () => () => <div>Mock Register View</div>);

import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

describe("Auth page wrappers", () => {
  it("renders the login page wrapper", () => {
    render(<LoginPage />);
    expect(screen.getByText("Mock Login View")).toBeInTheDocument();
  });

  it("renders the register page wrapper", () => {
    render(<RegisterPage />);
    expect(screen.getByText("Mock Register View")).toBeInTheDocument();
  });
});
