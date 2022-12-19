import prisma from "../../config/db";
import { findUserById } from "./users";
import { Todo } from "../../types/types";

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

// TODO
/**
 * find project
 * if project was passed in
 * reference object or leave undefined.
 */

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

const deleteTodo = async (id: number) =>
  await prisma.todo.delete({ where: { id } });

export { findTodos, getTodos, createTodo, deleteTodo };
