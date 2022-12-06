import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CRequest } from "../../types/types";

const verifyToken = (req: CRequest, res: Response, next: NextFunction) => {
  try {
    // get token
    const { token } = req.signedCookies;

    // if no token
    if (!token) return res.status(403).json({ err: "no token" });

    /**
     * either verify passes and next() is called
     * or
     * verify throws error, and catch happens
     */
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    /**
     * break down the info from decoded and add it to req
     * so we can use it in the next() function
     */

    const { iat, exp } = decoded;
    const { id, username } = decoded.user;

    req.data = { username, id, iat, exp };

    next();
  } catch (e) {
    console.log(`error in verifyToken`, e);
  }
};

export default verifyToken;
