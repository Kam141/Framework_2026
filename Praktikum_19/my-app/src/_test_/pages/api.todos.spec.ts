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

jest.mock("@/utils/db/servicefirebase");

import todosHandler from "@/pages/api/todos/[[...todos]]";
import { retrieveProducts, retrieveDataByID } from "@/utils/db/servicefirebase";
import type { NextApiRequest, NextApiResponse } from "next";

function mockRes() {
  const res: Partial<NextApiResponse> = {};
  res.status = jest.fn(() => res as NextApiResponse);
  res.json = jest.fn(() => res as NextApiResponse);
  return res as jest.Mocked<NextApiResponse>;
}

describe("API /todos handler", () => {
  beforeEach(() => {
    (retrieveProducts as jest.Mock).mockClear();
    (retrieveDataByID as jest.Mock).mockClear();
  });

  it("returns all todos when no ID given", async () => {
    const mockData = [
      { id: "1", name: "Todo 1", priority: "High", completed: false },
      { id: "2", name: "Todo 2", priority: "Low", completed: true },
    ];
    (retrieveProducts as jest.Mock).mockResolvedValue([
      { id: "1", title: "Test Todo 1" },
      { id: "2", title: "Test Todo 2" },
    ] as any);
    const req = { query: {} } as unknown as NextApiRequest;
    const res = mockRes();

    await todosHandler(req, res);

    expect(retrieveProducts).toHaveBeenCalledWith("todos");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: true, data: mockData })
    );
  });

  it("returns single todo when ID given in query", async () => {
    const mockItem = { id: "xyz", name: "Todo Detail", priority: "Medium", completed: false };
    (retrieveDataByID as jest.Mock).mockResolvedValue({
      id: "1",
      title: "Test Todo 1",
    } as any);
    const req = {
      query: { produk: ["todos", "xyz"] },
    } as unknown as NextApiRequest;
    const res = mockRes();

    await todosHandler(req, res);

    expect(retrieveDataByID).toHaveBeenCalledWith("todos", "xyz");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: true, data: mockItem })
    );
  });
});
