import prisma from "../config/db";
import { Project, UpdateProject } from "../types/types";

const findProjectById = async (id: number) =>
  await prisma.project.findUnique({ where: { id } });

const findCorrespondingTodos = async (id: number) =>
  await prisma.project.findUnique({ where: { id }, select: { todos: true } });

const projectBelongsToUser = async (projId: number, authId: number) => {
  const proj = await findProjectById(projId);
  if (!proj) throw Error(`no project found with id: ${projId}`);
  return proj.authorId === authId;
};

const getProjects = async (authorId: number) =>
  await prisma.project.findMany({ where: { authorId } });

const createProject = async ({ title, authorId }: Project) =>
  await prisma.project.create({
    data: { title, author: { connect: { id: authorId } } },
  });

const updateProject = async ({ newTitle, id, authorId }: UpdateProject) =>
  await prisma.project.updateMany({
    where: { id, authorId },
    data: { title: newTitle },
  });

const deleteProjectById = async (id: number) =>
  await prisma.project.delete({ where: { id } });

const deleteProjectAndDeleteAssociatedTasks = async (
  id: number,
  authorId: number
) => {
  await prisma.todo.deleteMany({ where: { projectId: id, authorId } });
  await prisma.project.delete({ where: { id, authorId } });
};

export {
  findProjectById,
  findCorrespondingTodos,
  projectBelongsToUser,
  createProject,
  getProjects,
  updateProject,
  deleteProjectById,
  deleteProjectAndDeleteAssociatedTasks,
};
