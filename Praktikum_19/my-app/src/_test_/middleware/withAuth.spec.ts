import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";


jest.mock("next-auth/jwt", () => ({
  __esModule: true,
  getToken: jest.fn(),
}));

import { getToken } from "next-auth/jwt";
import withAuth from "@/middleware/withAuth";

// Helper: create a fake NextRequest with a given pathname
function makeMockRequest(pathname: string): NextRequest {
  return {
    nextUrl: { pathname },
    url: `http://localhost${pathname}`,
  } as unknown as NextRequest;
}

// Dummy inner middleware that always calls next
const dummyMiddleware = jest.fn<(req: NextRequest, event: NextFetchEvent) => Promise<NextResponse>>().mockResolvedValue(NextResponse.next());

describe("withAuth middleware", () => {
  beforeEach(() => {
    (getToken as jest.Mock).mockClear();
    (dummyMiddleware as jest.Mock).mockClear();
  });

  it("calls inner middleware for non-protected paths", async () => {
    const handler = withAuth(dummyMiddleware as any, ["/admin", "/produk"]);
    const req = makeMockRequest("/about");
    const event = {} as any;

    await handler(req, event);

    expect(dummyMiddleware).toHaveBeenCalledWith(req, event);
  });

  it("redirects to /auth/login when no token on protected path", async () => {
    (getToken as jest.Mock).mockResolvedValue(null);

    const handler = withAuth(dummyMiddleware as any, ["/produk", "/admin"]);
    const req = makeMockRequest("/produk");
    const event = {} as any;

    const response = await handler(req, event);

    // Should be a redirect
    expect(response).toBeDefined();
    const redirectUrl = (response as NextResponse).headers.get("location");
    expect(redirectUrl).toContain("/auth/login");
    expect(dummyMiddleware).not.toHaveBeenCalled();
  });

  it("redirects to / when non-admin user tries to access /admin", async () => {
    (getToken as jest.Mock).mockResolvedValue({ role: "member" } as any);

    const handler = withAuth(dummyMiddleware as any, ["/admin"]);
    const req = makeMockRequest("/admin");
    const event = {} as any;

    const response = await handler(req, event);

    const redirectUrl = (response as NextResponse).headers.get("location");
    expect(redirectUrl).toContain("/");
    expect(dummyMiddleware).not.toHaveBeenCalled();
  });

  it("allows admin user to access /admin", async () => {
    (getToken as jest.Mock).mockResolvedValue({ role: "admin" } as any);

    const handler = withAuth(dummyMiddleware as any, ["/admin"]);
    const req = makeMockRequest("/admin");
    const event = {} as any;

    await handler(req, event);

    expect(dummyMiddleware).toHaveBeenCalledWith(req, event);
  });

  it("allows authenticated non-admin user to access /produk", async () => {
    (getToken as jest.Mock).mockResolvedValue({ role: "member" } as any);

    const handler = withAuth(dummyMiddleware as any, ["/produk", "/admin"]);
    const req = makeMockRequest("/produk");
    const event = {} as any;

    await handler(req, event);

    expect(dummyMiddleware).toHaveBeenCalledWith(req, event);
  });
});
