import { jest, describe, it, expect, beforeEach } from "@jest/globals";


jest.mock("firebase/app", () => ({
  __esModule: true,
  initializeApp: jest.fn(() => ({ name: "mock-app" })),
}));

jest.mock("firebase/firestore", () => ({
  __esModule: true,
  getFirestore: jest.fn(() => "mock-db"),
  collection: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  addDoc: jest.fn(),
  where: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("@/utils/db/servicefirebase", () => ({
  __esModule: true,
  signUp: jest.fn(),
}));

import handler from "@/pages/api/register";
import type { NextApiRequest, NextApiResponse } from "next";

const { signUp } = jest.requireMock("@/utils/db/servicefirebase") as {
  signUp: jest.Mock;
};

function mockRes() {
  const res: Partial<NextApiResponse> = {};
  res.status = jest.fn(() => res as NextApiResponse);
  res.json = jest.fn(() => res as NextApiResponse);
  return res as jest.Mocked<NextApiResponse>;
}

describe("API /register handler", () => {
  beforeEach(() => {
    (signUp as jest.Mock).mockClear();
  });

  it("returns 405 for non-POST requests", async () => {
    const req = { method: "GET", body: {} } as NextApiRequest;
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Method not allowed" })
    );
  });

  it("returns 200 on successful registration", async () => {
    (signUp as jest.Mock).mockImplementation((_data: any, cb: any) => {
      cb({ status: "success", message: "User registered successfully" });
      return Promise.resolve();
    });

    const req = {
      method: "POST",
      body: { email: "new@test.com", fullname: "New", password: "pw" },
    } as NextApiRequest;
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ name: "User registered successfully" })
    );
  });

  it("returns 400 when email already exists", async () => {
    (signUp as jest.Mock).mockImplementation((_data: any, cb: any) => {
      cb({ status: "error", message: "Email already exists" });
      return Promise.resolve();
    });

    const req = {
      method: "POST",
      body: { email: "existing@test.com", fullname: "X", password: "pw" },
    } as NextApiRequest;
    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Email already exists" })
    );
  });
});
