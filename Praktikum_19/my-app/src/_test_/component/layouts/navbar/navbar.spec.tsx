import "@testing-library/jest-dom/jest-globals";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

import { useSession, signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react");import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/layouts/navbar";

describe("Navbar Component", () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockClear();
    (signIn as jest.Mock).mockClear();
    (signOut as jest.Mock).mockClear();
  });

  it("should render Sign In button when user is unauthenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Navbar />);

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();

    fireEvent.click(signInButton);
    expect(signIn).toHaveBeenCalledTimes(1);
  });

  it("should render user info and Sign Out button when authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          fullname: "John Doe",
          image: "/avatar.png",
        },
      },
      status: "authenticated",
    });

    render(<Navbar />);

    expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();

    const avatar = screen.getByAltText("John Doe");
    expect(avatar).toBeInTheDocument();

    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();

    fireEvent.click(signOutButton);
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it("should render correctly without user image", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          fullname: "Jane Doe",
        },
      },
      status: "authenticated",
    });

    render(<Navbar />);

    expect(screen.getByText(/Welcome, Jane Doe/i)).toBeInTheDocument();
    
    // Expect the avatar NOT to be rendered since no image is provided.
    const avatar = screen.queryByRole("img");
    expect(avatar).not.toBeInTheDocument();
  });
});
