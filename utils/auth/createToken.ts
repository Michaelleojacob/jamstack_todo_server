import jwt from "jsonwebtoken";
import { User } from "../../types/types";

export const createToken = (user: User) => {
  try {
    return jwt.sign({ user }, process.env.TOKEN_SECRET!, { expiresIn: "6h" });
  } catch (e) {
    console.log(e);
  }
};

export default createToken;
