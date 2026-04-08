import { render, screen } from "@testing-library/react";
import Custom404 from "@/pages/404";
import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

describe("404 Page", () => {
  it("renders custom 404 page correctly", () => {
    // Next Image needs to be rendered, we can just render the page
    render(<Custom404 />);
    
    expect(screen.getByText("404 - Halaman Tidak Ditemukan")).toBeInTheDocument();
    expect(screen.getByText("Maaf, halaman yang Anda cari tidak ada.")).toBeInTheDocument();
    
    // Verifying link is present
    const link = screen.getByRole("link", { name: "← Kembali ke Home" });
    expect(link).toHaveAttribute("href", "/");

    // Verifying image is present
    const image = screen.getByAltText("404");
    expect(image).toBeInTheDocument();
  });
});
