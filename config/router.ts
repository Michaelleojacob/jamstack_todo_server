import { Application } from "express-serve-static-core";
import authRouter from "../routes/auth/auth";
import signupRouter from "../routes/auth/signup";
import protectedRouter from "../routes/testing_protected_routes/protected";
import signoutRouter from "../routes/auth/signout";
import todoRouter from "../routes/todos/todos";
import projectRouter from "../routes/projects/projects";

const routerConfig = (app: Application) => {
  app.use("/signup", signupRouter);
  app.use(authRouter);
  app.use("/signout", signoutRouter);
  app.use("/protected", protectedRouter);
  app.use("/todos", todoRouter);
  app.use("/projects", projectRouter);
};

export default routerConfig;
