import { CRequest } from "../../types/types";
import { Response } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../../db/todos";
import { Todo, UpdateTodo } from "../../types/types";

export const getAllTodos = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData) throw Error("no token");
    const todos = await getTodos(req.userData.id);
    return res.status(200).json({ msg: "got all todos", todos, succ: true });
  } catch (e) {
    console.log(e, "error in getAllTodos controller");
    return res
      .status(400)
      .json({ msg: "error in getAllTodos controller", succ: false });
  }
};

export const getSpecificTodo = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData) throw Error("no token");
    if (!req.params.todoId) throw Error("no todo id provided");
    const todo = await getTodo(Number(req.params.todoId));
    return res.status(200).json({ msg: "got todo", todo, succ: true });
  } catch (e) {
    console.log(e, "error in getSpecificTodo controller");
    return res
      .status(400)
      .json({ msg: "error in getSpecificTodo controller", succ: false });
  }
};

export const createTodoController = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData) throw Error("no token");
    const { title, desc, prio, due, done, notes, projectId } = req.body;
    const todoData: Todo = {
      title,
      desc,
      prio,
      due,
      done,
      notes,
      projectId: Number(projectId),
      authorId: req.userData.id,
    };
    const todo = await createTodo({ todoData });
    return res.status(200).json({ msg: "created todo", todo, succ: true });
  } catch (e) {
    console.log(e, "error in createTodoController");
    return res
      .status(400)
      .json({ msg: "error in createTodoController", succ: false });
  }
};

export const updateTodoController = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData) throw Error("no token");
    if (!req.params.todoId) throw Error("no todoId provided");
    const updateTodoData: UpdateTodo = {
      title: req.body.title,
      desc: req.body.desc,
      prio: req.body.prio,
      due: req.body.due,
      done: req.body.done,
      notes: req.body.notes,
      projectId: Number(req.body.projectId),
      id: Number(req.params.todoId),
    };
    const updatedTodo = await updateTodo({ updateTodoData });
    return res
      .status(200)
      .json({ msg: "todo updated", updatedTodo, succ: true });
  } catch (e) {
    console.log(e, "error in updateTodoController");
    return res
      .status(400)
      .json({ msg: "error in updateTodoController", succ: false });
  }
};

export const deleteTodoController = async (req: CRequest, res: Response) => {
  try {
    if (!req.userData) throw Error("no token");
    if (!req.params.todoId) throw Error("no todoId provided");
    const deleteResult = await deleteTodo(Number(req.params.todoId));
    return res
      .status(200)
      .json({ msg: "todo was deleted", deleteResult, succ: true });
  } catch (e) {
    console.log(e, "error in deleteTodoController");
    return res
      .status(400)
      .json({ msg: "error in deleteTodoController", succ: false });
  }
};
