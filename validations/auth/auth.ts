import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateSignUp = [
  check("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("invalid username")
    .bail(),
  check("password")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("invalid password")
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array({ onlyFirstError: true }) });
    }
    next();
  },
];

export const validateSignIn = [
  check("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("invalid username")
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
