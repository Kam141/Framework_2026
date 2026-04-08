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

  import produkHandler from "@/pages/api/[[...produk]]";
  import { retrieveProducts, retrieveDataByID } from "@/utils/db/servicefirebase";
  import type { NextApiRequest, NextApiResponse } from "next";

  function mockRes() {
    const res: Partial<NextApiResponse> = {};
    res.status = jest.fn(() => res as NextApiResponse);
    res.json = jest.fn(() => res as NextApiResponse);
    return res as jest.Mocked<NextApiResponse>;
  }

  describe("API /produk handler", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("returns all products when no ID given", async () => {
      const mockData = [
        { id: "1", name: "Baju Koko", price: 150000, category: "Pakaian" },
        { id: "2", name: "Celana Panjang", price: 200000, category: "Pakaian" },
      ];
      (retrieveProducts as jest.Mock).mockResolvedValue(mockData as any);
      const req = { query: { produk: [] } } as unknown as NextApiRequest;
      const res = mockRes();

      await produkHandler(req, res);

      expect(retrieveProducts).toHaveBeenCalledWith("products");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: true, data: mockData })
      );
    });

    it("returns single product when ID given in query", async () => {
      const mockItem = {
        id: "abc",
        name: "Celana",
        price: 150000,
        category: "Pakaian",
      };
      (retrieveDataByID as jest.Mock).mockResolvedValue(mockItem as any);
      const req = {
        query: { produk: ["produk", "abc"] },
      } as unknown as NextApiRequest;
      const res = mockRes();

      await produkHandler(req, res);

      expect(retrieveDataByID).toHaveBeenCalledWith("products", "abc");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: true, data: mockItem })
      );
    });
  });
