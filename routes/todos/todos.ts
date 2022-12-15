import express, { Response } from "express";
import verifyToken from "../../middleware/auth/verifyToken";
import { CRequest } from "../../types/types";
import { createTodo, findTodos } from "../../utils/db/todos";
import TodoData from "../../utils/factory/todos";

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
// todoRouter.post("/", verifyToken, async (req: CRequest, res: Response) => {
// const { title, desc, prio, due, done, projectId } = req.body;
// const user = await prisma.user.findUnique({
// where: { id: req.userData?.id },
// });
// const project =
//   projectId === null
//     ? null
//     : await prisma.project.findUnique({ where: { id: projectId } });
// const newTodo = await prisma.todo.create({
//   data: {
//     title,
//     desc,
//     prio,
//     due,
//     done,
//     creation: Date.now().toString(),
//     author: { connect: { id: user?.id } },
//     project:
//       project === null ? undefined : { connect: { id: project?.id } },
//   },
// });
// return res.status(201).json({ info: "todo created" });
// return res.status(200).json({ info: "test" });
// });

// create todo
todoRouter.post("/", verifyToken, async (req: CRequest, res: Response) => {
  if (req.userData) {
    const { title, desc, prio, due, done, projectId } = req.body;
    const todo = new TodoData(title, desc, prio, due, done, projectId);
    // console.log(todo);
    const result = await createTodo(Number(req.userData.id), todo);
    console.log(result);
    return res.status(200).json({ info: "testing" });
  }
});

todoRouter.delete("/delete/:id", async (req: CRequest, res: Response) => {
  // const deleteTodoId = req.params.id;
  // const;
});

export default todoRouter;
