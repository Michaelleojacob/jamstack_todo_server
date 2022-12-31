import { CRequest, User, UserInfo } from "../../types/types";
import { Response } from "express";
import { findUserByUserName } from "../../db/users";
import { comparePassword } from "../../utils/auth/bcrypt";
import createToken from "../../utils/auth/createToken";

const log_in = async (req: CRequest, res: Response) => {
  try {
    // if sender has a token, clear the token.
    if (req.token) res.clearCookie("token");

    // check to make sure user exists
    const user: User | null = await findUserByUserName(req.body.username);

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
    return res.status(200).json({ msg: "logged in. token created", token });
  } catch (e) {
    console.log(e, `error in signin post`);
    return null;
  }
};

export { log_in };
