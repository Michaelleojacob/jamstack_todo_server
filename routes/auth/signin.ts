import express from "express";
import { Response } from "express";
import validateSignIn from "../../validations/signin";
import { CRequest, User } from "../../types/types";
import createToken from "../../utils/auth/createToken";
import { findUserByUserName } from "../../utils/db/users";
import { comparePassword } from "../../utils/auth/bcrypt";

const signinRouter = express.Router();

// log in
signinRouter.post("/", validateSignIn, async (req: CRequest, res: Response) => {
  try {
    // if there is a token, clear it
    if (req.token) res.clearCookie("token");

    // check if the user exists
    const user: User | null = await findUserByUserName(req.body.username);

    // no user found
    if (!user)
      return res.status(404).json({ info: "incorrect username or password" });

    // user was found, check password
    const match = await comparePassword(req.body.password, user?.password!);

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

    res.cookie("token", token, {
      signed: true,
    });
    return res.status(200).json({ info: "+logged in. +token created", token });
  } catch (e) {
    console.log(`error in signin post`, e);
    return null;
  }
});

export default signinRouter;
