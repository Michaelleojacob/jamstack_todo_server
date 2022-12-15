import express, { Response } from "express";
import verifyToken from "../../middleware/auth/verifyToken";
import { CRequest } from "../../types/types";
import { findTodos } from "../../utils/db/todos";
import prisma from "../../config/db";

const todoRouter = express.Router();

// get todos
todoRouter.get("/", verifyToken, async (req: CRequest, res: Response) => {
  if (req.userData) {
    const todos = await findTodos(Number(req.userData.id));
    return res.status(400).json({ info: "got todos", todos });
  }
  return res.status(400).json({ info: "error in todo router get /" });
});

// create todo
todoRouter.post("/", verifyToken, async (req: CRequest, res: Response) => {
  const { title, desc, prio, due, done, projectId } = req.body;
  const user = await prisma.user.findUnique({
    where: { id: req.userData?.id },
  });
  const newTodo = await prisma.todo.create({
    data: {
      title,
      desc,
      prio,
      due,
      done,
      author: { connect: { id: user?.id } },
      // project: project === null ? undefined : { connect: { id: project?.id } },
    },
  });
  return res.status(201).json({ info: "todo created" });
});

// create todo

todoRouter.delete("/delete/:id", async (req: CRequest, res: Response) => {
  // const deleteTodoId = req.params.id;
  // const;
});

export default todoRouter;
