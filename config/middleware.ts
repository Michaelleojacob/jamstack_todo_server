import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const middlewareConfig = (app: Application) => {
  app.use(morgan("short"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser(process.env.COOKIE_SECRET));
};

export default middlewareConfig;
