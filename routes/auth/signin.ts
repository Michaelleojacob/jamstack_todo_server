import express from "express";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const signinRouter = express.Router();
const prisma = new PrismaClient();

signinRouter.get("/", (req, res) => {
  return res.json({ info: "this is the sign up page" });
});

interface FindUser {
  username?: string;
  password?: string;
}

signinRouter.post(
  "/",
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("invalid username")
    .bail(),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("invalid password")
    .bail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array({ onlyFirstError: true }) });
    }

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
  }
);

export default signinRouter;
