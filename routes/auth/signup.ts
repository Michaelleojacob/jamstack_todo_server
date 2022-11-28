import express from "express";
const signupRouter = express.Router();

signupRouter.get("/", (req, res) => {
  res.json({ yo: "hello" });
});

signupRouter.post("/", (req, res) => {
  console.log(req.body);
});

export default signupRouter;
