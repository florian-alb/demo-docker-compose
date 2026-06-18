import { describe, expect, it } from "vitest";

describe("test", () => {
  it("should return 10", async () => {
    const main = async () => {
      return 10;
    };
    const result = await main();
    expect(result).toBe(10);
  });
});
