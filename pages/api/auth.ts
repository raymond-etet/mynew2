import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      if (req.query.action === "register") {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: { username, password: hashedPassword },
        });
        res.status(201).json({ message: "User registered successfully" });
      } else if (req.query.action === "login") {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1h",
          }
        );

        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        res.status(200).json({
          token,
          user: {
            id: user.id,
            username: user.username,
          },
          expiresAt,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
