import { check, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const sanitizeTodoParams = [
  param("todoId").exists().toInt().trim().escape(),
];

export const sanitizeCreateTodo = [
  check("title")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("invalid project title")
    .bail(),
  check("desc").optional({ nullable: true, checkFalsy: true }).trim().escape(),
  check("prio").optional({ nullable: true, checkFalsy: true }).trim().escape(),
  check("due").optional({ nullable: true, checkFalsy: true }).trim().escape(),
  check("done").optional({ nullable: true, checkFalsy: true }).trim().escape(),
  check("notes").optional({ nullable: true, checkFalsy: true }).escape(),
  check("projectId")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) });
    }
    next();
  },
];
export const sanitizeUpdateTodo = [
  check("title").optional({ nullable: true, checkFalsy: true }).trim().escape(),
  check("desc").optional({ nullable: true, checkFalsy: true }).trim().escape(),
  check("prio").optional({ nullable: true, checkFalsy: true }).trim().escape(),
  check("due").optional({ nullable: true, checkFalsy: true }).trim().escape(),
  check("done").optional({ nullable: true, checkFalsy: true }).trim().escape(),
  check("notes").optional({ nullable: true, checkFalsy: true }).trim().escape(),
  check("projectId")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) });
    }
    next();
  },
];
