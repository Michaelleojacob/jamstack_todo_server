import express from "express";
import verifyToken from "../../middleware/verifyToken";
import protectedEndPoint from "../../controllers/protected/protected";
const protectedRouter = express.Router();

protectedRouter.get("/", verifyToken, protectedEndPoint);

export default protectedRouter;
