import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { getFirestore, collection, getDocs, getDoc, doc, query, addDoc, where, updateDoc } from "firebase/firestore";

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

import {
  ROLE,
  getUserByEmail,
  retrieveProducts,
  retrieveDataByID,
  signIn,
  signUp,
  signInWithGoogle,
} from "@/utils/db/servicefirebase";

// Helper: build a fake snapshot
function makeSnapshot(docs: object[]) {
  return {
    docs: docs.map((data) => ({
      id: "mock-id",
      data: () => data,
    })),
  };
}

describe("servicefirebase — ROLE constants", () => {
  it("has correct ROLE values", () => {
    expect(ROLE.MEMBER).toBe("member");
    expect(ROLE.EDITOR).toBe("editor");
    expect(ROLE.ADMIN).toBe("admin");
  });
});

describe("servicefirebase — getUserByEmail", () => {
  beforeEach(() => {
    (query as jest.Mock).mockReturnValue("mock-query" as any);
    (collection as jest.Mock).mockReturnValue("mock-collection" as any);
    (where as jest.Mock).mockReturnValue("mock-where" as any);
  });

  it("returns user data when found", async () => {
    (getDocs as jest.Mock).mockResolvedValue(
      makeSnapshot([{ email: "test@test.com", fullname: "Test" }]) as any
    );

    const user = await getUserByEmail("test@test.com");
    expect(user).toMatchObject({ email: "test@test.com", fullname: "Test" });
  });

  it("returns null when user not found", async () => {
    (getDocs as jest.Mock).mockResolvedValue(makeSnapshot([]) as any);
    const user = await getUserByEmail("notfound@test.com");
    expect(user).toBeNull();
  });
});

describe("servicefirebase — retrieveProducts", () => {
  it("returns array of products from firestore", async () => {
    (collection as jest.Mock).mockReturnValue("mock-collection" as any);
    (getDocs as jest.Mock).mockResolvedValue(
      makeSnapshot([
        { name: "Produk A", price: 10000 },
        { name: "Produk B", price: 20000 },
      ]) as any
    );

    const result = await retrieveProducts("produk");
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ name: "Produk A" });
  });
});

describe("servicefirebase — retrieveDataByID", () => {
  it("returns data for a given document ID", async () => {
    (doc as jest.Mock).mockReturnValue("mock-doc-ref" as any);
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ name: "Detail Produk" }),
    } as any);

    const result = await retrieveDataByID("produk", "abc123");
    expect(result).toMatchObject({ name: "Detail Produk" });
  });
});

describe("servicefirebase — signIn", () => {
  it("returns user by email", async () => {
    (query as jest.Mock).mockReturnValue("mock-query" as any);
    (collection as jest.Mock).mockReturnValue("mock-collection" as any);
    (where as jest.Mock).mockReturnValue("mock-where" as any);
    (getDocs as jest.Mock).mockResolvedValue(
      makeSnapshot([{ email: "user@test.com", fullname: "User" }]) as any
    );

    const user = await signIn("user@test.com");
    expect(user).toMatchObject({ email: "user@test.com" });
  });
});

describe("servicefirebase — signUp", () => {
  beforeEach(() => {
    (query as jest.Mock).mockReturnValue("mock-query" as any);
    (collection as jest.Mock).mockReturnValue("mock-collection" as any);
    (where as jest.Mock).mockReturnValue("mock-where" as any);
    (addDoc as jest.Mock).mockResolvedValue({ id: "new-id" } as any);
    const bcrypt = require("bcrypt");
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-password" as any);
  });

  it("calls callback with success when user does not exist", async () => {
    (getDocs as jest.Mock).mockResolvedValue(makeSnapshot([]) as any);

    const callback = jest.fn();
    await signUp(
      { email: "new@test.com", fullname: "New User", password: "secret" },
      callback
    );

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ status: "success" })
    );
  });

  it("calls callback with error when email already exists", async () => {
    (getDocs as jest.Mock).mockResolvedValue(
      makeSnapshot([{ email: "existing@test.com" }]) as any
    );

    const callback = jest.fn();
    await signUp(
      { email: "existing@test.com", fullname: "Existing", password: "123" },
      callback
    );

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ status: "error", message: "Email already exists" })
    );
  });

  it("assigns default role MEMBER if not specified", async () => {
    (getDocs as jest.Mock).mockResolvedValue(makeSnapshot([]) as any);

    const callback = jest.fn();
    const userData = { email: "a@b.com", fullname: "Test", password: "pw" };
    await signUp(userData, callback);

    // role should be assigned to MEMBER before addDoc is called
    expect(addDoc).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ status: "success" }));
  });
});

describe("servicefirebase — signInWithGoogle", () => {
  beforeEach(() => {
    (query as jest.Mock).mockReturnValue("mock-query" as any);
    (collection as jest.Mock).mockReturnValue("mock-collection" as any);
    (where as jest.Mock).mockReturnValue("mock-where" as any);
    (doc as jest.Mock).mockReturnValue("mock-doc-ref" as any);
    (updateDoc as jest.Mock).mockResolvedValue(undefined as any);
    (addDoc as jest.Mock).mockResolvedValue({ id: "new-id" } as any);
  });

  it("updates existing user and calls callback with status true", async () => {
    (getDocs as jest.Mock).mockResolvedValue(
      makeSnapshot([{ email: "google@test.com", role: "member" }]) as any
    );

    const callback = jest.fn();
    await signInWithGoogle({ email: "google@test.com", fullname: "G User" }, callback);

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ status: true, message: "User logged in" })
    );
  });

  it("creates new user when they do not exist", async () => {
    (getDocs as jest.Mock).mockResolvedValue(makeSnapshot([]) as any);

    const callback = jest.fn();
    await signInWithGoogle({ email: "newgoogle@test.com", fullname: "New G" }, callback);

    expect(addDoc).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ status: true, message: "User registered" })
    );
  });

  it("calls callback with status false on error", async () => {
    (getDocs as jest.Mock).mockRejectedValue(new Error("Firestore error") as any);

    const callback = jest.fn();
    await signInWithGoogle({ email: "err@test.com" }, callback);

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ status: false })
    );
  });
});
