import jwt from "jsonwebtoken";
import { User } from "../../types/types";
import dotenv from "dotenv";
dotenv.config();

export const createToken = (user: User) => {
  try {
    return jwt.sign({ user }, process.env.SECRET!, { expiresIn: "6h" });
  } catch (e) {
    console.log(e);
  }
};

export default createToken;
