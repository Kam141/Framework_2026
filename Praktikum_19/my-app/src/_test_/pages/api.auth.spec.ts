import { jest, describe, it, expect, beforeEach } from "@jest/globals";

// Mock all Firebase and bcrypt deps before importing authOptions
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
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock("@/utils/db/servicefirebase", () => ({
  signIn: jest.fn(),
  signInWithGoogle: jest.fn(),
}));

jest.mock("next-auth/providers/credentials", () => ({
  __esModule: true,
  default: jest.fn(() => ({ id: "credentials", name: "credentials" })),
}));
jest.mock("next-auth/providers/google", () => ({
  __esModule: true,
  default: jest.fn(() => ({ id: "google", name: "Google" })),
}));
jest.mock("next-auth/providers/github", () => ({
  __esModule: true,
  default: jest.fn(() => ({ id: "github", name: "GitHub" })),
}));
jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn(() => jest.fn()),
}));

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { signIn, signInWithGoogle } from "@/utils/db/servicefirebase";
import bcrypt from "bcrypt";

// Pull out the authorize fn from the first provider (CredentialsProvider)
const credentialsProvider = authOptions.providers[0] as any;
const authorize = credentialsProvider.authorize;

// Pull jwt and session callbacks
const jwtCallback = authOptions.callbacks!.jwt!;
const sessionCallback = authOptions.callbacks!.session!;

describe("authOptions — CredentialsProvider authorize", () => {
  beforeEach(() => {
    jest.mocked(signIn).mockClear();
    jest.mocked(bcrypt.compare as any).mockClear();
  });

  it("returns null when credentials are missing", async () => {
    const result = await authorize({} as any, {} as any);
    expect(result).toBeNull();
  });

  it("returns null when user not found in DB", async () => {
    jest.mocked(signIn).mockResolvedValue(null as any);
    const result = await authorize(
      { email: "no@one.com", password: "pw" } as any,
      {} as any
    );
    expect(result).toBeNull();
  });

  it("returns null when password is invalid", async () => {
    jest.mocked(signIn).mockResolvedValue({
      id: "1",
      email: "user@test.com",
      password: "hashed",
      fullname: "User",
      role: "member",
    } as any);
    (jest.mocked(bcrypt.compare) as any).mockResolvedValue(false);

    const result = await authorize(
      { email: "user@test.com", password: "wrong" } as any,
      {} as any
    );
    expect(result).toBeNull();
  });

  it("returns user object when credentials are valid", async () => {
    jest.mocked(signIn).mockResolvedValue({
      id: "abc",
      email: "user@test.com",
      password: "hashed",
      fullname: "Test User",
      role: "member",
    } as any);
    (jest.mocked(bcrypt.compare) as any).mockResolvedValue(true);

    const result = await authorize(
      { email: "user@test.com", password: "correct" } as any,
      {} as any
    );
    expect(result).toMatchObject({
      id: "abc",
      email: "user@test.com",
      fullname: "Test User",
      role: "member",
    });
    // password must NOT be returned
    expect((result as any)?.password).toBeUndefined();
  });
});

describe("authOptions — JWT callback", () => {
  it("sets token fields for credentials provider", async () => {
    const token = {} as any;
    const result = await jwtCallback({
      token,
      account: { provider: "credentials" },
      user: { email: "u@test.com", fullname: "U", role: "admin" },
    } as any);
    expect(result.email).toBe("u@test.com");
    expect(result.role).toBe("admin");
  });

  it("calls signInWithGoogle for google provider", async () => {
    jest.mocked(signInWithGoogle).mockImplementation((_data: any, cb: any) => {
      cb({
        status: true,
        data: { fullname: "G User", email: "g@test.com", image: "", role: "member", type: "google" },
      });
      return Promise.resolve();
    });

    const token = {} as any;
    await jwtCallback({
      token,
      account: { provider: "google" },
      user: { email: "g@test.com", name: "G User", image: "" },
    } as any);

    expect(signInWithGoogle).toHaveBeenCalled();
  });

  it("returns token unchanged when no account", async () => {
    const token = { email: "existing@test.com" } as any;
    const result = await jwtCallback({ token, account: null, user: null } as any);
    expect(result.email).toBe("existing@test.com");
  });
});

describe("authOptions — session callback", () => {
  it("maps token fields to session.user", async () => {
    const session = { user: {} } as any;
    const token = {
      email: "s@test.com",
      fullname: "Session User",
      image: "/img.png",
      role: "editor",
    };

    const result = await sessionCallback({ session, token } as any);
    expect(result.user).toMatchObject({
      email: "s@test.com",
      fullname: "Session User",
      image: "/img.png",
      role: "editor",
    });
  });
});
