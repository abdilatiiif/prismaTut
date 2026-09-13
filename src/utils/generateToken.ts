import jwt from "jsonwebtoken";
import type { Response } from "express";

const generateToken = (userId: string, res: Response) => {
  const payload = { id: userId };
  const jwtSecret = process.env.JWT_SECRET as jwt.Secret;
  const options: jwt.SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ??
      "1d") as jwt.SignOptions["expiresIn"],
  };

  const token = jwt.sign(payload, jwtSecret, options);

  // Set the token in an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
  return token;
};

export default generateToken;
