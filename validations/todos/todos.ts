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
  check("desc").trim().escape(),
  check("prio").trim().escape(),
  check("due").trim().escape(),
  check("done").trim().escape().isBoolean(),
  check("notes").escape(),
  check("projectId").trim().escape().toInt(),
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
  check("title").trim().escape(),
  check("desc").trim().escape(),
  check("prio").trim().escape(),
  check("due").trim().escape(),
  check("done").trim().escape(),
  check("notes").trim().escape(),
  check("projectId").trim().escape(),
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
