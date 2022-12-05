import express, { Request, Response } from "express";
import verifyToken from "../../middleware/auth/verifyToken";
const protectedRouter = express.Router();

protectedRouter.get("/", verifyToken, (req: Request, res: Response) => {
  return res.status(200).json({ info: "hit protected end point" });
});

export default protectedRouter;
