import { Application } from "express-serve-static-core";
import authRouter from "../routes/auth/auth";
import protectedRouter from "../routes/testing_protected_routes/protected";
import todoRouter from "../routes/todos/todos";
import projectRouter from "../routes/projects/projects";

const routerConfig = (app: Application) => {
  app.use(authRouter);
  // app.use("/protected", protectedRouter);
  // app.use("/todos", todoRouter);
  // app.use("/projects", projectRouter);
};

export default routerConfig;
