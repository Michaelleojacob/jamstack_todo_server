import express from "express";
import { Request, Response } from "express";
import prisma from "../../config/db";
import bcrypt from "bcrypt";
import validateSignIn from "../../validations/signin";
import { CRequest, User } from "../../types/types";
import createToken from "../../utils/auth/createToken";

const signinRouter = express.Router();

// log in
signinRouter.post("/", validateSignIn, async (req: CRequest, res: Response) => {
  try {
    // if there is a token, clear it
    if (req.token) res.clearCookie("token");

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
     *
     * delete password from user
     * make token using user name and user id
     *
     * add token to cookies
     */

    delete user.password;
    const token = createToken(user);

    res.cookie("token", token, { signed: true });
    return res.status(200).json({ info: "+logged in. +token created", token });
  } catch (e) {
    console.log(`error in signin post`, e);
  }
});

export default signinRouter;
