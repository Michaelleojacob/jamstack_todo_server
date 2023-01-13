import prisma from "../config/db";
import { Todo, UpdateTodo } from "../types/types";

export const getTodos = async (authorId: number) =>
  await prisma.todo.findMany({
    where: { authorId },
    include: { project: true },
  });

export const getTodo = async (todoId: number) =>
  await prisma.todo.findUnique({ where: { id: todoId } });

export const createTodo = async ({ todoData }: { todoData: Todo }) => {
  try {
    return await prisma.todo.create({
      data: {
        title: todoData.title,
        desc: todoData.desc,
        prio: todoData.prio,
        due: todoData.due,
        done: todoData.done,
        notes: todoData.notes,
        project: todoData.projectId
          ? { connect: { id: todoData.projectId } }
          : undefined,
        author: { connect: { id: todoData.authorId } },
      },
    });
  } catch (e) {
    console.log(e, "error in createTodo");
    return false;
  }
};
// const todoData: Todo = {
//   title: "first todo",
//   desc: "1",
//   prio: "low",
//   // projectId: 10,
//   authorId: 14,
// };
// createTodo({ todoObject }).then((res) => console.log(res));

export const updateTodo = async ({
  updateTodoData,
}: {
  updateTodoData: UpdateTodo;
}) => {
  try {
    const { title, desc, prio, due, done, notes, projectId, id } =
      updateTodoData;
    const todo = await getTodo(id);
    if (!todo) throw Error("no todo found");
    return prisma.todo.update({
      where: { id },
      data: {
        title: title ? title : todo.title,
        desc: desc ? desc : todo.desc,
        prio: prio ? prio : todo.prio,
        due: due ? due : todo.due,
        done: done ? done : todo.done,
        notes: notes ? notes : todo.notes,
        project: projectId ? { connect: { id: projectId } } : undefined,
      },
    });
  } catch (e) {
    console.log(e, "error in updateTodo");
    return false;
  }
};
// const updateTodoData = {
//   id: 11,
//   desc: "updated my first todo!",
//   projectId: 10,
// };
// updateTodo({ updateTodoData }).then((res) => console.log(res));

export const deleteTodo = async (todoId: number) => {
  try {
    return !!(await prisma.todo.delete({ where: { id: todoId } }));
  } catch (e) {
    console.log(e, "error in deleteTodo");
    return false;
  }
};
// deleteTodo(11).then((res) => console.log(res));
