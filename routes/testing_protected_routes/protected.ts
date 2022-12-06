import express, { Response } from "express";
import verifyToken from "../../middleware/auth/verifyToken";
import { CRequest } from "../../types/types";
const protectedRouter = express.Router();

protectedRouter.get("/", verifyToken, (req: CRequest, res: Response) => {
  console.log(req.data);
  return res.status(200).json({ info: "hit protected end point" });
});

export default protectedRouter;
