import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

const middlewareConfig = (app: Application) => {
  app.use(morgan("short"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
};

export default middlewareConfig;
