import prisma from "../config/db";

/**
 * anywhere that users both userId and projId should call projBelongsToUser
 */

// returns boolean
const projBelongsToUser = async (userId: number, projId: number) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      projects: { where: { id: projId }, select: { authorId: true } },
    },
  });
  if (!data) return false;
  if (!data.projects.length) return false;
  if (!data.projects[0].authorId) return false;
  return userId === data.projects[0].authorId;
};
// projBelongsToUser(15, 11).then((res) => console.log(res));
// projBelongsToUser(15, 8).then((res) => console.log(res));
// projBelongsToUser(200, 11).then((res) => console.log(res));

// return all projects or false
const findUserProjects = async (userId: number) => {
  const data = await prisma.user.findMany({
    where: { id: userId },
    select: { projects: true },
  });
  if (!data.length) return false;
  return data[0].projects;
};
// findUserProjects(15).then((res) => console.log(res));
// findUserProjects(200).then((res) => console.log(res));

/**
 * if userid === projectid -> checks proj belongs to user
 * return projects that belong to that use
 */
const findProjectById = async (userId: number, projId: number) => {
  const confirmUserIdMatchesProj = await projBelongsToUser(userId, projId);
  if (!confirmUserIdMatchesProj) return false;
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { projects: { where: { id: projId } } },
  });
  if (!data) return false;
  if (!data.projects.length) return false;
  return data;
};
// findProjectById(15, 11).then((res) => console.log(res));
// findProjectById(200, 11).then((res) => console.log(res));
// findProjectById(15, 200).then((res) => console.log(res));

const createProject = async (userId: number, title: string) => {
  try {
    return await prisma.project.create({
      data: { title, author: { connect: { id: userId } } },
    });
  } catch (e) {
    console.log(e, `err in createProject`);
    return false;
  }
};
// createProject(15, "lol").then((res) => console.log(res));

/**
 * this will return the user
 * NOT the newly created project.
 * requires a second query, or to just create via prisma.project.create
 */
const createProjectX = async (userId: number, title: string) => {
  try {
    const data = await prisma.user.update({
      where: { id: userId },
      data: { projects: { create: { title } } },
    });
    return data;
  } catch (e) {
    console.log(e, `err in createProj`);
    return false;
  }
};
// createProject(200, "runescape").then((res) => console.log(res));
// createProject(15, "a").then((res) => console.log(res));

const deleteProject = async (userId: number, projId: number) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { projects: { delete: { id: projId } } },
    });
    return true;
  } catch (e) {
    console.log(e, `err in deleteproject`);
    return false;
  }
};
// deleteProject(15, 12).then((res) => console.log(res));
// deleteProject(200, 12).then((res) => console.log(res));
// deleteProject(15, 200).then((res) => console.log(res));
// findUserProjects(15).then((res) => console.log(res));
