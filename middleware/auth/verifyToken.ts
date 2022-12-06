import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // get token
    const token = req.signedCookies.token;

    // if no token
    if (!token) return res.status(403).json({ err: "no token" });

    /**
     * either verify passes and next() is called
     * or
     * verify throws error, and catch happens
     */
    jwt.verify(token, process.env.TOKEN_SECRET!);

    next();
  } catch (e) {
    console.log(`error in verifyToken`, e);
  }
};

export default verifyToken;
