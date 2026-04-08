import { jest, describe, it, expect } from "@jest/globals";

jest.mock("next/server", () => ({
  __esModule: true,
  NextResponse: {
    next: jest.fn(() => ({ type: "next" })),
    redirect: jest.fn((url: URL) => ({ type: "redirect", location: url.toString() })),
  },
}));

const withAuthMock = jest.fn((middleware: any) => middleware);

jest.mock("../../middleware/withAuth", () => ({
  __esModule: true,
  default: withAuthMock,
}));

import middlewareDefault, { mainMiddleware, config } from "@/middleware";
import { NextResponse } from "next/server";

describe("middleware module execution", () => {
  it("mainMiddleware returns NextResponse.next()", () => {
    const response = mainMiddleware({} as any);
    expect(response).toEqual({ type: "next" });
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("default export uses withAuth wrapper and returns middleware result", async () => {
    const req = { url: "http://localhost/produk", nextUrl: { pathname: "/produk" } } as any;
    const result = await middlewareDefault(req, {} as any);

    expect(withAuthMock).toHaveBeenCalled();
    expect(result).toEqual({ type: "next" });
  });

  it("config matcher contains the protected routes", () => {
    expect(config.matcher).toEqual(["/produk", "/admin", "/editor"]);
  });
});
