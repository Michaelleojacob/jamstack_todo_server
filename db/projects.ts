import prisma from "../config/db";
import { ProjectAuthorId, UpdateprojectByProjectId } from "../types/types";

// get author id for that project
export const getProjectAuthorId = async (projectId: number) =>
  await prisma.project.findUnique({
    where: { id: projectId },
    select: { authorId: true },
  });

// get all projects
export const getProjects = async (authorId: number) =>
  await prisma.project.findMany({ where: { authorId } });
// getProjects(15).then((res) => console.log(res));
// getProjects(200).then((res) => console.log(res));

export const checkProjectExists = async (projectId: number) =>
  !!(await prisma.project.findUnique({ where: { id: projectId } }));

export const getProject = async (projectId: number) =>
  await prisma.project.findUnique({
    where: { id: projectId },
    include: { todos: true },
  });
// getProject(16).then((res) => console.log(res));
// getProject(200).then((res) => console.log(res));

export const createProject = async ({ authorId, title }: ProjectAuthorId) => {
  try {
    return await prisma.project.create({
      data: { title, author: { connect: { id: authorId } } },
    });
  } catch (e) {
    console.log(e, " err in createProject");
    return false;
  }
};
// createProject({ authorId: 15, title: "lol" }).then((res) => console.log(res));

export const updateProject = async ({
  newTitle,
  projectId,
}: UpdateprojectByProjectId) => {
  try {
    return await prisma.project.update({
      where: { id: projectId },
      data: { title: newTitle },
    });
  } catch (e) {
    console.log(e, " err in updateProject");
    return false;
  }
};
// updateProject({ newTitle: "new project1", projectId: 11 }).then((res) =>
//   console.log(res)
// );

export const deleteProject = async (projectId: number) => {
  try {
    return !!(await prisma.project.delete({ where: { id: projectId } }));
  } catch (e) {
    console.log(e, "err in deleteProject");
    return false;
  }
};
// deleteProject(15).then((res) => console.log(res));
