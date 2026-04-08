import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import fetcher from "@/utils/swr/fetcher";

describe("fetcher utility", () => {
  beforeEach(() => {
    global.fetch = jest.fn() as any;
  });

  it("calls fetch with the given URL", async () => {
    const jsonMock: jest.Mock = (jest.fn() as any).mockResolvedValue({ data: [] });
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      json: jsonMock,
      ok: true,
      status: 200,
    } as any);

    await fetcher("/api/todos");

    expect(global.fetch).toHaveBeenCalledWith("/api/todos");
  });

  it("returns parsed JSON from response", async () => {
    const mockData = { data: [{ id: 1, name: "Test" }] };
    const jsonMock2: jest.Mock = (jest.fn() as any).mockResolvedValue(mockData);
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      json: jsonMock2,
      ok: true,
      status: 200,
    } as any);

    const result = await fetcher("/api/todos");

    expect(result).toEqual(mockData);
  });

  it("throws when fetch fails", async () => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(
      new Error("Network error")
    );

    await expect(fetcher("/api/todos")).rejects.toThrow("Network error");
  });
});
