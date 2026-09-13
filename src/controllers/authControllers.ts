import { prisma } from "../config/db.ts";
import { Request, Response } from "express";



const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // check if the user already exists in the database

  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  res.json({
    message: "User registered successfully",
    body: { name, email, password },
  });
};

export { register };
