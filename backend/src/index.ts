import { Server } from "http";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    server = app.listen(8000, () => {
      console.log("🚀 Server running on port");
    });
  } catch (error) {
    console.error("💣 MS-AUTH: Database connection failed:", error);
    process.exit(1);
  }
};

startServer();

const shutDown = async () => {
  console.log("\nServer shutting down...");
  if (server) {
    await new Promise((resolve) => server.close(resolve));
    console.log("Server closed");
  }
  process.exit(0);
};

process.on("SIGINT", shutDown);
