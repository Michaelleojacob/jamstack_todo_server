import { CRequest, User, UserInfo } from "../../types/types";
import { Request, Response } from "express";
import { findUserByName, isNameAvailable, createUser } from "../../db/users";
import { comparePassword, hashPassword } from "../../utils/auth/bcrypt";
import createToken from "../../utils/auth/createToken";

const log_out = async (req: CRequest, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "logged out successfully" });
  } catch (e) {
    console.log(e, "err in log_out");
    return res.status(400).json({ msg: "err in log_out" });
  }
};

const log_in = async (req: CRequest, res: Response) => {
  try {
    // if sender has a token, clear the token.
    if (req.token) res.clearCookie("token");

    // check to make sure user exists
    const user: User | null = await findUserByName(req.body.username);

    // if no user was found
    if (!user) return res.status(400).json({ msg: "no user found" });

    // compare body password and hash in the db
    const match = await comparePassword(req.body.password, user.password);

    // if password and hash did not match
    if (!match)
      return res.status(400).json({ msg: "incorrect username or password" });

    /**
     * creating an object without the password(hash) info.
     * this is to be used when creating the token
     */
    const userInfo: UserInfo = { username: user.username, id: user.id };

    // create token
    const token = createToken(userInfo);

    // send the user a cookie with the token data
    res.cookie("token", token, { signed: true });

    // remove token from this once done testing
    return res.status(200).json({ msg: "logged in and token created", token });
  } catch (e) {
    console.log(e, `error in signin post`);
    return res.status(400).json({ msg: "err logging in" });
  }
};

const sign_up = async (req: Request, res: Response) => {
  try {
    // extract relevant info from body
    const { username, password } = req.body;

    // check if name is taken
    const checkName = await isNameAvailable(username);

    // if it is taken - throw error
    if (checkName) throw Error("name taken");

    // hash the password from the body
    const hash = await hashPassword(password);

    // create the user in postgres using the hash.
    const user = await createUser(username, hash);

    // if something went wrong trying to create the user
    if (!user) throw Error("err creating user");

    // user created successfully.
    return res.status(201).json({ msg: `user ${user.username} created` });
  } catch (e) {
    console.log(e, "err in /signupRouter");
    res.status(400).json({ msg: "err in sign up" });
  }
};

export { log_in, log_out, sign_up };
