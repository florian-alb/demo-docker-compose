import http from "node:http";
import os from "node:os";
import { fileURLToPath } from "node:url";

const startedAt = new Date().toISOString();

export const getInstanceInfo = () => ({
  service: "backend",
  instance: os.hostname(),
  pid: process.pid,
  startedAt,
  node: process.env.NODE_NAME || null,
});

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(payload));
};

export const createServer = () =>
  http.createServer((request, response) => {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, { status: "ok" });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/instance") {
      sendJson(response, 200, getInstanceInfo());
      return;
    }

    sendJson(response, 404, { error: "Not found" });
  });

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000);

  createServer().listen(port, "0.0.0.0", () => {
    console.log(`Backend instance ${os.hostname()} listening on port ${port}`);
  });
}
