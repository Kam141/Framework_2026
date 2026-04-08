import { describe, it, expect } from "@jest/globals";
import middlewareDefault from "@/middleware";

describe("Middleware default export", () => {
  it("exports a function as the default middleware", () => {
    expect(typeof middlewareDefault).toBe("function");
  });
});
