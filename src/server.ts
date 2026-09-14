// side-effekt-import: må stå FØR "./config/db.js" importeres, ellers leser
// PrismaPg process.env.DATABASE_URL før .env er lastet (ESM hoister imports,
// rekkefølgen imports står i filen er det eneste som styrer dette)
import "dotenv/config";

import express from "express";

import { connectToDatabase, disconnectFromDatabase } from "./config/db.js";

connectToDatabase();

// Import Routes

import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

const app = express();

// Middleware - parsing JSON bodies
app.use(express.json());

// API Routes

app.use("/movies", movieRoutes);

app.use("/auth", authRoutes);

app.use("/watchlist", watchlistRoutes);

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", async (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  await disconnectFromDatabase();
  process.exit(1);
});

process.on("uncaughtException", async (error) => {
  console.error("Uncaught Exception:", error);
  await disconnectFromDatabase();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  await disconnectFromDatabase();
  process.exit(0);
});
