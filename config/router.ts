import { Application } from "express-serve-static-core";
import authRouter from "../routes/auth/auth";
import protectedRouter from "../routes/protected/protected";
import todoRouter from "../routes/todos/todos";
import projectRouter from "../routes/projects/projects";

const routerConfig = (app: Application) => {
  app.use("/auth", authRouter);
  app.use("/protected", protectedRouter);
  // app.use("/projects", projectRouter);
  // app.use("/todos", todoRouter);
};

export default routerConfig;
