import { jest, describe, it, expect } from "@jest/globals";

// Mock next/server before importing middleware
jest.mock("next/server", () => ({
  NextResponse: {
    next: jest.fn(() => ({ type: "next" })),
    redirect: jest.fn((url: URL) => ({ type: "redirect", url: url.toString() })),
  },
}));

jest.mock("../../middleware/withAuth", () => ({
  __esModule: true,
  default: jest.fn((middleware: any, _matcher: string[]) => middleware),
}));

jest.mock("next-auth/jwt", () => ({
  __esModule: true,
  getToken: jest.fn(),
}));

import { mainMiddleware, config } from "@/middleware";
import { NextResponse } from "next/server";

describe("mainMiddleware", () => {
  it("calls NextResponse.next()", () => {
    const mockReq = {} as any;
    mainMiddleware(mockReq);
    expect(NextResponse.next).toHaveBeenCalled();
  });
});

describe("middleware config", () => {
  it("has correct matcher paths", () => {
    expect(config.matcher).toContain("/produk");
    expect(config.matcher).toContain("/admin");
    expect(config.matcher).toContain("/editor");
  });
});
