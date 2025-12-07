import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { seedCRM } from "./crm.ts";
import { generateDeckHandler } from "./generate-deck.ts";
import { slideAIHandler } from "./slide-ai.ts";
import { imageAIHandler } from "./image-ai.ts";
import { researchAIHandler } from "./research-ai.ts";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6522a742/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/make-server-6522a742/seed-crm", seedCRM);

app.post("/make-server-6522a742/generate-deck", generateDeckHandler);

app.post("/make-server-6522a742/slide-ai", slideAIHandler);

app.post("/make-server-6522a742/image-ai", imageAIHandler);

app.post("/make-server-6522a742/research-ai", researchAIHandler);

Deno.serve(app.fetch);