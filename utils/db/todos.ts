import prisma from "../../config/db";
import { findUserById } from "./users";
import TodoData from "../factory/todos";
import { Todo } from "../../types/types";

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

const createTodo = async (todo: Todo) => {
  const { authorId, title, desc, prio, due, done, projectId } = todo;
  const userExists = await findUserById(authorId);
  if (userExists) {
    const dbtodo = await prisma.todo.create({
      data: {
        title,
        desc,
        prio,
        due,
        done,
        author: { connect: { id: authorId } },
        // project: project === null ? undefined : { connect: { id: project?.id } },
      },
    });
    return dbtodo;
  }
};

export { findTodos, getTodos, createTodo };
