import express from "express";
import { Request, Response } from "express";
import { hashPassword } from "../../utils/auth/bcrypt";
import validateSignUp from "../../validations/signup";
import { createUser, isNameAvailable } from "../../utils/db/users";

const signupRouter = express.Router();

signupRouter.get("/", (req: Request, res: Response) => {
  return res.json({ info: "this is the signup page" });
});

signupRouter.post("/", validateSignUp, async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const checkName = await isNameAvailable(username);
  if (!checkName) return res.status(400).json({ info: `name taken` });
  const hash = await hashPassword(password);
  const user = await createUser(username, hash);
  return res.status(201).json({ info: `user ${user.username} created` });
});

export default signupRouter;
