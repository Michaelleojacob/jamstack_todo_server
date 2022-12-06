import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validateSignUp from "../../validations/signup";

const signupRouter = express.Router();
const prisma = new PrismaClient();

signupRouter.get("/", (req: Request, res: Response) => {
  return res.json({ info: "this is the signup page" });
});

signupRouter.post("/", validateSignUp, async (req: Request, res: Response) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(req.body.password, salt);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: password,
      },
    });
    return res.status(400).json({ info: `user ${user.username} created` });
  } catch (e) {
    console.log("error at signup post", e);
  }
});

export default signupRouter;
