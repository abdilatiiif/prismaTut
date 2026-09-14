import express from "express";

import { addToWatchlist } from "../controllers/watchlistController.ts";

const router = express.Router();

router.post("/", addToWatchlist);

export default router;
