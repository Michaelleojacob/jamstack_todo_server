import express, { Response } from "express";
import verifyToken from "../../middleware/verifyToken";
import { CRequest } from "../../types/types";
const protectedRouter = express.Router();

protectedRouter.get("/", verifyToken, (req: CRequest, res: Response) => {
  return res.status(200).json({ info: "hit protected end point" });
});

export default protectedRouter;
