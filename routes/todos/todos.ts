import express, { Request, Response } from "express";
import prisma from "../../config/db";
import verifyToken from "../../middleware/auth/verifyToken";
import { CRequest } from "../../types/types";

const todoRouter = express.Router();

// get todos
todoRouter.get("/", verifyToken, async (req: CRequest, res: Response) => {
  try {
    const result = await prisma.todo.findMany({
      where: { authorId: req?.userData?.id },
    });
    return res.status(200).json({ info: "got user todos", result });
  } catch (e) {
    console.log(e);
  }
});

// create todo
todoRouter.post("/", verifyToken, async (req: CRequest, res: Response) => {
  try {
    const { title, desc, prio, due, done, projectId } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: req.userData?.id },
    });

    const project =
      projectId === null
        ? null
        : await prisma.project.findUnique({ where: { id: projectId } });

    const newTodo = await prisma.todo.create({
      data: {
        title,
        desc,
        prio,
        due,
        done,
        creation: Date.now().toString(),
        author: { connect: { id: user?.id } },
        project:
          project === null ? undefined : { connect: { id: project?.id } },
      },
    });
    return res.status(201).json({ info: "todo created", newTodo });
    // return res.status(200).json({ info: "test" });
  } catch (e) {
    console.log(e);
  }
});

todoRouter.delete("/delete/:id", async (req: CRequest, res: Response) => {
  const deleteTodoId = req.params.id;
  // const;
});

export default todoRouter;
