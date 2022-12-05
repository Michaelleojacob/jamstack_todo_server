import express from "express";
import { Request, Response, NextFunction } from "express";
import prisma from "../../config/db";
import bcrypt from "bcrypt";
import validateSignIn from "../../validations/signin";
import { FindUser } from "../../types/types";

const signinRouter = express.Router();

signinRouter.get("/", (req: Request, res: Response) => {
  return res.json({ info: "this is the sign up page" });
});

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
