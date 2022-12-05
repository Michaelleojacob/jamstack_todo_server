import express from "express";
import { Request, Response } from "express";
import prisma from "../../config/db";
import bcrypt from "bcrypt";
import validateSignIn from "../../validations/signin";
import { User } from "../../types/types";
import createToken from "../../utils/auth/createToken";

const signinRouter = express.Router();

// log in
signinRouter.post("/", validateSignIn, async (req: Request, res: Response) => {
  try {
    // check if the user exists
    const user: User | null = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    // no user found
    if (user === null)
      return res.status(404).json({ info: "incorrect username or password" });

    // user was found, check password
    const match = await bcrypt.compare(req.body.password, user.password!);

    // incorrect passowrd
    if (!match)
      return res.status(403).json({ info: " incorrect username or password" });

    /**
     * correct username and password
     * make token
     * append token to Request
     */

    const token = createToken(user);
    req.token = token;

    res.status(200).json({ info: "+logged in. +token created" });

    req;
  } catch (err) {
    console.log(err);
    res.status(502).json({ info: "signin POST error" });
  }
});

export default signinRouter;
