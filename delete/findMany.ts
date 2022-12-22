import prisma from "../config/db";
import { findUserById } from "../utils/db/users";

/**
 * will always return an array.
 * - array of objects (all tasks)
 * - empty array
 */
const findTodos = async (authorId: number) =>
  await prisma.todo.findMany({
    where: {
      authorId,
    },
  });

/**
 * checking if the user exists first before finding todos
 * result will always be array of objects or null.
 */
const getTodos = async (authorId: number) => {
  const userExists = await findUserById(authorId);
  return userExists ? await findTodos(userExists.id) : null;
};

findTodos(11).then((res) => console.log(res));
