```ts
const validateSignUp = [
  check("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("invalid username")
    .bail()
    .custom(async (val) => {
      const isNameTaken = await prisma.user.findFirst({
        where: {
          username: val,
        },
      });
      if (isNameTaken !== null)
        return Promise.reject("username already in use");
    })
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
```
