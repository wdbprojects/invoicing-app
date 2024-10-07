import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: "./.env.local",
});

if (typeof process.env.XATA_DATABASE_URL !== "string") {
  throw new Error("Missing XATA_DATABASE_URL environment variable");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.XATA_DATABASE_URL,
  },
});
