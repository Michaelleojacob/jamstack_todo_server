import jwt from "jsonwebtoken";
import { User } from "../../types/types";

export const createToken = (user: User) =>
  jwt.sign(user, process.env.TOKEN_SECRET!, { expiresIn: "6h" });

export default createToken;
