import "dotenv/config";
import { Server } from "http";
import app from "./app";
import { PORT } from "./constants/env";
import connectToDatabase from "./config/db";

let server: Server;

const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
    await connectToDatabase();
  } catch (error) {
    console.error("💣 Database connection failed:", error);
    process.exit(1);
  }
};

startServer();

const shutDown = async () => {
  console.log("\n🔒 Server shutting down...");
  if (server) {
    await new Promise((resolve) => server.close(resolve));
    console.log("🔐 Server closed");
  }
  process.exit(0);
};

process.on("SIGINT", shutDown);
