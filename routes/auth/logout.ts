import express from "express";

const logoutRouter = express.Router();

logoutRouter.get("/", (req, res) => {
  return res.json({ info: "logged out" });
});

export default logoutRouter;
