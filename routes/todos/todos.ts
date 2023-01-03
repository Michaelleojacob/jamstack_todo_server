import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodos,
  getSpecificTodo,
  updateTodoController,
} from "../../controllers/todos/todos";
import verifyToken from "../../middleware/verifyToken";
import {
  sanitizeCreateTodo,
  sanitizeUpdateTodo,
} from "../../validations/todos/todos";
const todosRouter = express.Router();

todosRouter.get("/", verifyToken, getAllTodos);
todosRouter.get("/:todoId", verifyToken, getSpecificTodo);
todosRouter.post("/", verifyToken, sanitizeCreateTodo, createTodoController);
todosRouter.put(
  "/:todoId",
  verifyToken,
  sanitizeUpdateTodo,
  updateTodoController
);
todosRouter.delete("/:todoId", verifyToken, deleteTodoController);

export default todosRouter;
