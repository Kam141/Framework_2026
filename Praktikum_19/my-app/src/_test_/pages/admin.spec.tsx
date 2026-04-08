import { render, screen } from "@testing-library/react";
import HalamanAdmin from "@/pages/admin";
import "@testing-library/jest-dom/jest-globals";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

describe("Admin Page", () => {
  it("renders admin page correctly", () => {
    render(<HalamanAdmin />);
    
    expect(screen.getByText("Halaman Admin")).toBeInTheDocument();
    expect(screen.getByText(/Selamat datang di halaman admin!/i)).toBeInTheDocument();
  });
});
