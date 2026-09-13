import { prisma } from "../config/db.ts";
import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.ts";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // check if the user already exists in the database

    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists " });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    // Generate a JWT token for the newly registered user
    const token = generateToken(user.id, res);

    //return response

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: name,
          email: email.toLowerCase(),
        },
        token,
      },
      message: "User registered successfully 🟢",
    });
  } catch (error: any) {
    // disse tre linjene er det vi faktisk trenger å se i terminalen
    console.log("MESSAGE:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "invalid credentials or user does not exist" });
    }

    // Compare the provided password with the hashed password in the database

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: "invalid credentials or user does not exist" });
    }

    // 1.Generate a JWT token
    // 2.Set token for users browser to use for authentication in future requests

    const token = generateToken(user.id, res);

    // login successful, return user data (excluding password)
    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email.toLowerCase(),
        },
        token,
      },
      message: "User logged in successfully 🟢",
    });
  } catch (error: any) {
    console.log("MESSAGE:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = (req: Request, res: Response) => {
  // Clear the JWT cookie

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire in the past
  });

  res.status(200).json({
    status: "success",
    message: "User logged out successfully 🟢",
  });
};

export { register, login, logout };
