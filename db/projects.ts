import prisma from "../config/db";

export const getProjectAuthorId = async (id: number) =>
  await prisma.project.findUnique({
    where: { id },
    select: { authorId: true },
  });

export const getProjects = async (id: number) =>
  await prisma.project.findMany({ where: { id } });
