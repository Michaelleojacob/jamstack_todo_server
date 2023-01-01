import express from "express";
import { log_in, log_out, sign_up } from "../../controllers/auth/auth";
import { validateSignIn, validateSignUp } from "../../validations/auth/auth";

const authRouter = express.Router();

authRouter.get("/signout", log_out);

authRouter.post("/signin", validateSignIn, log_in);

authRouter.post("/signup", validateSignUp, sign_up);

export default authRouter;
