import { findUserById } from "../utils/db/users";
import { CRequest } from "../types/types";
import { Response, NextFunction } from "express";

const confirmUser = async (
  req: CRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.userData) {
    const user = await findUserById(req.userData.id);
    if (user) {
      next();
    }
    return;
  }
};

export default confirmUser;
