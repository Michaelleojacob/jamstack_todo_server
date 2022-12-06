import jwt from "jsonwebtoken";
import { User } from "../../types/types";

export const createToken = (user: User) => {
  try {
    return jwt.sign({ user }, process.env.TOKEN_SECRET!, { expiresIn: "3s" });
  } catch (e) {
    console.log(`error in createToken`, e);
  }
};

export default createToken;
