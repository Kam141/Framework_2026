import "@testing-library/jest-dom/jest-globals";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { ReactNode } from "react";

import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

import { render, screen } from "@testing-library/react";
import HalamanProfile from "@/pages/profile";

describe("Profile Page", () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockClear();
  });

  it("renders profile page correctly with user data", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { fullname: "Ahmad" } },
      status: "authenticated",
    });

    render(<HalamanProfile />);
    
    expect(screen.getByText("Halaman Profile")).toBeInTheDocument();
    expect(screen.getByText("Selamat Datang Ahmad")).toBeInTheDocument();
  });

  it("renders profile page correctly without user data", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<HalamanProfile />);
    
    expect(screen.getByText("Halaman Profile")).toBeInTheDocument();
    expect(screen.getByText(/Selamat Datang/i)).toBeInTheDocument();
  });
});
