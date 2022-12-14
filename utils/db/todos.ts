import prisma from "../../config/db";
import { findUserById } from "./users";
import { Todo } from "../../types/types";
import TodoData from "../factory/todos";

/**
 * will always return an array.
 * - array of objects (all tasks)
 * - empty array
 */
const findTodos = async (userId: number) =>
  await prisma.todo.findMany({
    where: {
      authorId: userId,
    },
  });

/**
 * checking if the user exists first before finding todos
 * result will always be array of objects or null.
 */
const getTodos = async (userId: number) => {
  const userExists = await findUserById(userId);
  return userExists ? await findTodos(userExists.id) : null;
};

const createTodo = async (userId: number, todo: TodoData) => {
  const userExists = await findUserById(userId);
  if (userExists) {
    console.log(todo);
  }
  // return userExists ? await prisma.todo.create({ data: { data } }) : null;
};

export { findTodos, getTodos, createTodo };
