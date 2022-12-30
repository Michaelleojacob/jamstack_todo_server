import express, { Request, Response } from "express";

const signoutRouter = express.Router();

signoutRouter.get("/", (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "logged out" });
});

export default signoutRouter;
