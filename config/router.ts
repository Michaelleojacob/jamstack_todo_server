import { Application } from "express-serve-static-core";
import signinRouter from "../routes/auth/signin";
import signupRouter from "../routes/auth/signup";
import protectedRouter from "../routes/testing_protected_routes/protected";

const routerConfig = (app: Application) => {
  app.use("/signup", signupRouter);
  app.use("/signin", signinRouter);
  app.use("/protected", protectedRouter);
};

export default routerConfig;
