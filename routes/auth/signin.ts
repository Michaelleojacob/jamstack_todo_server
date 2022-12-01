import express from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validateSignIn from "../../validations/signin";

const signinRouter = express.Router();
const prisma = new PrismaClient();

signinRouter.get("/", (req: Request, res: Response) => {
  return res.json({ info: "this is the sign up page" });
});

interface FindUser {
  username?: string;
  password?: string;
}

signinRouter.post("/", validateSignIn, async (req: Request, res: Response) => {
  try {
    const findUser: FindUser | null = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      },
    });

    if (findUser === null)
      return res.json({ info: "username or password are incorrect" });

    const match = await bcrypt.compare(req.body.password, findUser.password!);

    return match
      ? res.json({ info: "logged in" })
      : res.json({ info: "username or password were not correct" });
  } catch (e) {
    res.status(500).json({ info: "error at signin POST" });
  }
});

export default signinRouter;
