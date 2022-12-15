import prisma from "../../config/db";

const findProjectById = async (id: number) =>
  await prisma.project.findUnique({ where: { id } });

const getProjects = async (authorId: number) =>
  await prisma.project.findMany({ where: { authorId } });

const createProject = async () => {};

const updateProject = async () => {};

const deleteProjectById = async (id: number) =>
  await prisma.project.delete({ where: { id } });

export {
  findProjectById,
  createProject,
  getProjects,
  updateProject,
  deleteProjectById,
};
