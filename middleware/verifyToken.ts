import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CRequest, TokenData } from "../types/types";

const verifyToken = (req: CRequest, res: Response, next: NextFunction) => {
  try {
    // get token
    const { token }: { token: string } = req.signedCookies;

    // if no token
    if (!token) return res.status(403).json({ err: "no token" });

    /**
     * either verify passes and next() is called
     * or
     * verify throws error, and catch happens
     */
    // const decoded:TokenData = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    /**
     * break down the msg from decoded and add it to req
     * so we can use it in the next() function
     */

    req.userData = decoded as TokenData;

    next();
  } catch (e) {
    console.log(e, "err in verifyToken");
    return res.status(400).json({ msg: "bad token", action: "delete_token" });
  }
};

export default verifyToken;
