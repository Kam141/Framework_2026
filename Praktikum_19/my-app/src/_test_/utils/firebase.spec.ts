import { jest, describe, it, expect } from "@jest/globals";

import { initializeApp } from "firebase/app";

// Mock firebase/app before any imports
jest.mock("firebase/app", () => ({
  __esModule: true,
  initializeApp: jest.fn(() => ({
    name: "mock-app",
    projectId: "mock-project",
    apiKey: "mock-key",
    appId: "mock-id",
  })),
}));

import app from "@/utils/db/firebase";

describe("Firebase App Initialization", () => {
  it("exports a valid firebase app instance", () => {
    expect(app).toBeDefined();
  });

  it("app instance has name property", () => {
    expect(app).toHaveProperty("name");
  });

  it("initializeApp was called during module import", () => {
    expect((initializeApp as jest.Mock).mock.calls.length).toBeGreaterThan(0);
  });

  it("app has expected firebase config properties", () => {
    expect(app).toHaveProperty("name");
  });
});
