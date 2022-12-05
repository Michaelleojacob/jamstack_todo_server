import { Application } from "express-serve-static-core";
import signupRouter from "../routes/auth/signup";

const routerConfig = (app: Application) => {
  app.use("/signup", signupRouter);
};

export default routerConfig;
