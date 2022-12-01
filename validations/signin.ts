import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const validateSignIn = [
  check("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("invalid username")
    // .bail()
    // .custom(async (val) => {
    //   const findUser = await prisma.user.findFirst({
    //     where: {
    //       username: val,
    //     },
    //   });
    //   if (findUser === null) return Promise.reject("no user found");
    // })
    .bail(),
  check("password")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("invalid password")
    .bail(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array({ onlyFirstError: true }) });
    }
    next();
  },
];

export default validateSignIn;
