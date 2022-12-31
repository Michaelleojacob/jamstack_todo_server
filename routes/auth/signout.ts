import express, { Request, Response } from "express";

const signoutRouter = express.Router();

signoutRouter.get("/", (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "logged out" });
  } catch (e) {
    return res.status(400).json({ msg: "issue logging out" });
  }
});

export default signoutRouter;
