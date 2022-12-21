import prisma from "../../config/db";
import { findUserById } from "./users";
import { Todo, UpdateTodo } from "../../types/types";

/**
 * will always return an array.
 * - array of objects (all tasks)
 * - empty array
 */
const findTodos = async (authorId: number) =>
  await prisma.todo.findMany({ where: { authorId } });

/**
 * checking if the user exists first before finding todos
 * result will always be array of objects or null.
 */
const getTodos = async (userId: number) => {
  const userExists = await findUserById(userId);
  return userExists ? await findTodos(userExists.id) : null;
};

const getProjectTodos = async (projectId: number) =>
  prisma.todo.findMany({ where: { projectId } });

const createTodo = async (todoData: Todo) => {
  const { authorId, title, desc, prio, due, done, projectId } = todoData;
  const dbtodo = await prisma.todo.create({
    data: {
      title,
      desc,
      prio,
      due,
      done,
      author: { connect: { id: authorId } },
      project: projectId ? { connect: { id: projectId } } : {},
    },
  });
  return dbtodo;
};

const updateTodo = async (todoData: UpdateTodo) => {
  const { id, authorId, title, desc, prio, due, done, projectId } = todoData;
  const updatedTodo = await prisma.todo.update({
    // where: { id, author: { id: authorId } },
    where: { id, authorId },
    data: {
      title,
      desc,
      prio,
      due,
      done,
      project: projectId ? { connect: { id: projectId } } : {},
    },
  });
  return updatedTodo;
};

const deleteTodo = async (id: number) =>
  await prisma.todo.delete({ where: { id } });

export {
  findTodos,
  getTodos,
  getProjectTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
