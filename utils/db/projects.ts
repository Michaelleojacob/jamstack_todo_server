import prisma from "../../config/db";
import { Project, UpdateProject } from "../../types/types";

const findProjectById = async (id: number) =>
  await prisma.project.findUnique({ where: { id } });

const findCorrespondingTodos = (id: number) => {};

const getProjects = async (authorId: number) =>
  await prisma.project.findMany({ where: { authorId } });

const createProject = async ({ title, authorId }: Project) =>
  await prisma.project.create({ data: { title, authorId } });

const updateProject = async ({ newTitle, id, authorId }: UpdateProject) =>
  await prisma.project.update({
    where: { id, author: { id: authorId } },
    data: { title: newTitle },
  });

const deleteProjectById = async (id: number) =>
  await prisma.project.delete({ where: { id } });

const deleteProjectAndAssociatedTasks = async (id: number) => {};

export {
  findProjectById,
  createProject,
  getProjects,
  updateProject,
  deleteProjectById,
};
