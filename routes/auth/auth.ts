import express from "express";
import { log_in, log_out, sign_up } from "../../controllers/auth/auth";

const authRouter = express.Router();

authRouter.post("/signin", log_in);
authRouter.get("/signout", log_out);
authRouter.post("/signup", sign_up);

export default authRouter;
