import jwt from "jsonwebtoken";
import { UserInfo } from "../../types/types";

const createToken = (user: UserInfo) =>
  jwt.sign(user, process.env.TOKEN_SECRET!, { expiresIn: "6h" });

export default createToken;
