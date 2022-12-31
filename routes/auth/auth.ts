import express from "express";
import { log_in } from "../../controllers/auth/auth";

const authRouter = express.Router();

authRouter.post("/signin", log_in);

export default authRouter;
