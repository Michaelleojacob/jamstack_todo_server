import express, { Response } from "express";
import verifyToken from "../../middleware/auth/verifyToken";
import { CRequest, Todo } from "../../types/types";
import { findTodos, createTodo } from "../../utils/db/todos";

const todoRouter = express.Router();

// get todos
todoRouter.get("/", verifyToken, async (req: CRequest, res: Response) => {
  if (req.userData) {
    const todos = await findTodos(Number(req.userData.id));
    return res.status(400).json({ info: "got todos", todos });
  }
  return res.status(400).json({ info: "error in todo router get /" });
});

todoRouter.post("/", verifyToken, async (req: CRequest, res: Response) => {
  try {
    if (req.userData) {
      const { title, desc, prio, due, done, projectId }: Todo = req.body;
      const todoData = await createTodo({
        authorId: req.userData.id,
        title,
        desc,
        prio,
        due,
        done,
        // project: project === null ? undefined : { connect: { id: project?.id } },
      });
      return res.status(201).json({ info: "todo created", todoData });
    }
  } catch (e) {
    console.log(`error in todoRouter post`, e);
    return res
      .status(400)
      .json({ info: "something went wrong in todoRouter post" });
  }
});

// delete todo
todoRouter.delete("/delete/:id", async (req: CRequest, res: Response) => {
  // const deleteTodoId = req.params.id;
  // const;
});

export default todoRouter;
