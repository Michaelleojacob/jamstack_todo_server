import { Application } from "express-serve-static-core";
import authRouter from "../routes/auth/auth";
import protectedRouter from "../routes/protected/protected";
import projectRouter from "../routes/projects/projects";
import todosRouter from "../routes/todos/todos";

const routerConfig = (app: Application) => {
  app.use("/auth", authRouter);
  app.use("/protected", protectedRouter);
  app.use("/projects", projectRouter);
  app.use("/todos", todosRouter);
};

export default routerConfig;
