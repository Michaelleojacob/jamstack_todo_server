import { Application } from "express-serve-static-core";
import signinRouter from "../routes/auth/signin";
import signupRouter from "../routes/auth/signup";
import protectedRouter from "../routes/testing_protected_routes/protected";
import signoutRouter from "../routes/auth/signout";

const routerConfig = (app: Application) => {
  app.use("/signup", signupRouter);
  app.use("/signin", signinRouter);
  app.use("/signout", signoutRouter);
  app.use("/protected", protectedRouter);
};

export default routerConfig;
