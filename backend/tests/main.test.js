import { describe, expect, it } from "vitest";
import { createServer, getInstanceInfo } from "../index.js";

describe("backend instance metadata", () => {
  it("returns the current backend instance", () => {
    const payload = getInstanceInfo();

    expect(payload.service).toBe("backend");
    expect(payload.instance).toEqual(expect.any(String));
    expect(payload.pid).toBe(process.pid);
    expect(payload.startedAt).toEqual(expect.any(String));
  });

  it("creates an HTTP server for the API", () => {
    const server = createServer();

    expect(server.listening).toBe(false);
    expect(typeof server.listen).toBe("function");
  });
});
