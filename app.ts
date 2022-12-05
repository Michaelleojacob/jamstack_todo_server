import express from "express";
import middlewareConfig from "./config/middleware";
import routerConfig from "./config/router";

const app = express();

middlewareConfig(app);
routerConfig(app);

export default app;
