import { CRequest, User, UserInfo } from "../../types/types";
import { Request, Response } from "express";
import { findUserByName, isNameAvailable, createUser } from "../../db/users";
import { comparePassword, hashPassword } from "../../utils/auth/bcrypt";
import createToken from "../../utils/auth/createToken";

export const log_out = async (req: CRequest, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "logged out", succ: true });
  } catch (e) {
    console.log(e, "error in log_out");
    return res.status(400).json({ msg: "error in log_out", succ: false });
  }
};

export const log_in = async (req: CRequest, res: Response) => {
  try {
    // if sender has a token, clear the token.
    if (req.signedCookies.token) res.clearCookie("token");

    // check to make sure user exists
    const user: User | null = await findUserByName(req.body.username);

    // if no user was found
    if (!user)
      return res
        .status(400)
        .json({ msg: "incorrect username or password", succ: false });

    // compare body password and hash in the db
    const match = await comparePassword(req.body.password, user.password);

    // if password and hash did not match
    if (!match)
      return res
        .status(400)
        .json({ msg: "incorrect username or password", succ: false });

    /**
     * creating an object without the password(hash) info.
     * this is to be used when creating the token
     */
    const userInfo: UserInfo = { username: user.username, id: user.id };

    // create token
    const token = createToken(userInfo);

    // send the user a cookie with the token data
    res.cookie("token", token, { signed: true, httpOnly: true });

    // remove token from this once done testing
    return res
      .status(200)
      .json({ msg: "logged in", succ: true, token, userInfo });
  } catch (e) {
    console.log(e, `error in signin post`);
    return res.status(400).json({ msg: "error logging in", succ: false });
  }
};

export const sign_up = async (req: Request, res: Response) => {
  try {
    // extract relevant info from body
    const { username, password } = req.body;

    // check if name is taken
    const checkName = await isNameAvailable(username);

    // if it is taken - throw Error
    if (checkName)
      return res.status(400).json({ msg: "name taken", succ: false });

    // hash the password from the body
    const hash = await hashPassword(password);

    // create the user in postgres using the hash.
    const user = await createUser(username, hash);

    // if something went wrong trying to create the user
    if (!user)
      return res.status(400).json({ msg: "error creating user", succ: false });

    // user created successfully.
    return res.status(201).json({ msg: `user created`, succ: true });
  } catch (e) {
    console.log(e, "error in /signupRouter");
    return res.status(400).json({ msg: "error in sign up", succ: false });
  }
};

// validate token, and return user data. (app refresh / closed). This is to use the token to re-log, instead of the user relogging.
export const refreshUser = async (req: CRequest, res: Response) => {
  try {
    // this passes verifyToken, so the token is valid.
    if (!req.userData)
      return res
        .status(400)
        .json({ msg: "no token - refreshUser", succ: false });
    return res
      .status(200)
      .json({ msg: "got user info", userInfo: req.userData, succ: true });
  } catch (e) {
    console.log(e, "error in refreshUser");
    return res.status(400).json({ msg: "error in refreshUser", succ: false });
  }
};
