import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import revalidateHandler from "@/pages/api/revalidate";
import type { NextApiRequest, NextApiResponse } from "next";
import { afterEach } from "node:test";

function mockRes() {
  const res: Partial<NextApiResponse> = {};
  res.status = jest.fn(() => res as NextApiResponse);
  res.json = jest.fn(() => res as NextApiResponse);
  res.send = jest.fn(() => res as NextApiResponse);
  res.revalidate = jest.fn<() => Promise<void>>().mockResolvedValue(undefined) as any;
  return res as jest.Mocked<NextApiResponse>;
}

describe("API /revalidate handler", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV, REVALIDATE_TOKEN: "secret-token" };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("returns 401 when token is wrong", async () => {
    const req = {
      query: { token: "wrong-token", data: "produk" },
    } as unknown as NextApiRequest;
    const res = mockRes();

    await revalidateHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ revalidated: false })
    );
  });

  it("revalidates /produk/static with correct token and data=produk", async () => {
    const req = {
      query: { token: "secret-token", data: "produk" },
    } as unknown as NextApiRequest;
    const res = mockRes();

    await revalidateHandler(req, res);

    expect(res.revalidate).toHaveBeenCalledWith("/produk/static");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ revalidated: true });
  });

  it("returns revalidated:false with invalid data param", async () => {
    const req = {
      query: { token: "secret-token", data: "invalid" },
    } as unknown as NextApiRequest;
    const res = mockRes();

    await revalidateHandler(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ revalidated: false })
    );
  });
});
