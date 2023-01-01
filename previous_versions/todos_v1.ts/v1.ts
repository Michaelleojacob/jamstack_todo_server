// import express, { Response } from "express";
// import verifyToken from "../../middleware/verifyToken";
// import { CRequest, Todo, UpdateTodo } from "../../types/types";
// import { findTodos, createTodo, deleteTodo, updateTodo } from "../../db/todos";

// const todoRouter = express.Router();

// // get todos
// todoRouter.get("/", verifyToken, async (req: CRequest, res: Response) => {
//   if (req.userData) {
//     const todos = await findTodos(Number(req.userData.id));
//     return res.status(400).json({ msg: "got todos", todos });
//   }
//   return res.status(400).json({ msg: "error in todo router get /" });
// });

// todoRouter.post("/", verifyToken, async (req: CRequest, res: Response) => {
//   try {
//     if (req.userData) {
//       const { title, desc, prio, due, done, projectId }: Todo = req.body;
//       const todoData = await createTodo({
//         authorId: req.userData.id,
//         title,
//         desc,
//         prio,
//         due,
//         done,
//         projectId,
//         // project: project === null ? undefined : { connect: { id: project?.id } },
//       });
//       return res.status(201).json({ msg: "todo created", todoData });
//     }
//   } catch (e) {
//     console.log(`error in todoRouter post`, e);
//     return res.status(400).json({ msg: "err in todoRouter post" });
//   }
// });

// // update todo
// todoRouter.put(
//   "/update/:id",
//   verifyToken,
//   async (req: CRequest, res: Response) => {
//     console.log("this ran");
//     if (req.userData) {
//       const id = Number(req.params.id);
//       const { title, desc, prio, due, done, projectId }: UpdateTodo = req.body;
//       const t = await updateTodo({
//         id,
//         authorId: req.userData?.id,
//         title,
//         desc,
//         prio,
//         due,
//         done,
//         projectId,
//       });
//       console.log(t);
//       return res.status(200).json({ msg: `${t} updated` });
//     }
//     try {
//     } catch (e) {
//       console.log(e);
//       return res.status(400).json({ msg: "err updating todo" });
//     }
//   }
// );

// // delete todo
// todoRouter.delete(
//   "/delete/:id",
//   verifyToken,
//   async (req: CRequest, res: Response) => {
//     try {
//       const id = Number(req.params.id);
//       if (req.userData) {
//         await deleteTodo(id);
//         return res.status(200).json({ msg: `deleted todo ${id}` });
//       }
//       throw new Error("no userData in delete todo http request");
//     } catch (e) {
//       console.log(e);
//       return res.status(400).json({ msg: `no todo deleted.` });
//     }
//   }
// );

// export default todoRouter;
