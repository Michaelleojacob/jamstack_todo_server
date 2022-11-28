import { PrismaClient } from "@prisma/client";
import express from "express";
const port = process.env.PORT || 3003;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const prisma = new PrismaClient();

import signupRouter from "./routes/auth/signup";
app.use("/signup", signupRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
