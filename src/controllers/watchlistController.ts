import { Request, Response } from "express";

import { prisma } from "../config/db.ts";

const addToWatchlist = async (req: Request, res: Response) => {
  const { movieId, status, rating, notes, userId } = req.body;

  //Verify movie exists in the database
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // check if already in watchlist
  const existingInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: userId,
        movieId: movieId,
      },
    },
  });

  if (existingInWatchlist) {
    return res.status(400).json({ error: "Movie already in the watchlist" });
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "Success",
    data: {
      watchlistItem,
    },
  });
};

export { addToWatchlist };
