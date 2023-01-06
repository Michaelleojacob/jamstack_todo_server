import express from "express";
import {
  log_in,
  log_out,
  sign_up,
  refreshUser,
} from "../../controllers/auth/auth";
import { validateSignIn, validateSignUp } from "../../validations/auth/auth";
import verifyToken from "../../middleware/verifyToken";

const authRouter = express.Router();

authRouter.get("/signout", log_out);

authRouter.post("/signin", validateSignIn, log_in);

authRouter.post("/signup", validateSignUp, sign_up);

authRouter.get("/refresh", verifyToken, refreshUser);

export default authRouter;
