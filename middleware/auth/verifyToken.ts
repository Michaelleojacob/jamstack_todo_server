import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.token;
  console.log(token);
  if (!token) return res.status(404).json({ info: "no token" });
  next();
};

export default verifyToken;
