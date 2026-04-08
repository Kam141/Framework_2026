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
  retrieveProducts: jest.fn(),
  retrieveDataByID: jest.fn(),
}));

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
      { id: "1", title: "Test Todo 1" },
      { id: "2", title: "Test Todo 2" },
    ];
    jest.spyOn(servicefirebase, "retrieveProducts").mockResolvedValue(mockData as any);
    const req = { query: {} } as unknown as NextApiRequest;
    const res = mockRes();

    await todosHandler(req, res);

    expect(servicefirebase.retrieveProducts).toHaveBeenCalledWith("todos");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: true, data: mockData })
    );
  });

  it("returns single todo when ID given in query", async () => {
    const mockItem = { id: "xyz", title: "Test Todo 1" };
    jest.spyOn(servicefirebase, "retrieveDataByID").mockResolvedValue(mockItem as any);
    const req = {
      query: { todos: ["xyz"] },
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
