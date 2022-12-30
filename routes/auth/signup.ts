import express from "express";
import { Request, Response } from "express";
import { hashPassword } from "../../utils/auth/bcrypt";
import validateSignUp from "../../validations/signup";
import { createUser, isNameAvailable } from "../../db/users";

const signupRouter = express.Router();

signupRouter.get("/", (req: Request, res: Response) => {
  return res.json({ msg: "this is the signup page" });
});

signupRouter.post("/", validateSignUp, async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const checkName = await isNameAvailable(username);
  if (!checkName) return res.status(400).json({ msg: `name taken` });
  const hash = await hashPassword(password);
  const user = await createUser(username, hash);
  return res.status(201).json({ msg: `user ${user.username} created` });
});

export default signupRouter;
