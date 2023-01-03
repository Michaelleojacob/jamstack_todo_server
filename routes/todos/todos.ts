import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodos,
  getSpecificTodo,
  updateTodoController,
} from "../../controllers/todos/todos";
import verifyToken from "../../middleware/verifyToken";
const todosRouter = express.Router();

todosRouter.get("/", verifyToken, getAllTodos);
todosRouter.get("/:todoId", verifyToken, getSpecificTodo);
todosRouter.post("/", verifyToken, createTodoController);
todosRouter.put("/:todoId", verifyToken, updateTodoController);
todosRouter.delete("/:todoId", verifyToken, deleteTodoController);

export default todosRouter;
