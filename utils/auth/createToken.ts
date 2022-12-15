import jwt from "jsonwebtoken";
import { User } from "../../types/types";

console.log;

export const createToken = (user: User) => {
  try {
    return jwt.sign({ user }, process.env.TOKEN_SECRET!, { expiresIn: "6h" });
  } catch (e) {
    console.log(`error in createToken`, e);
  }
};

export default createToken;
