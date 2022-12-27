import prisma from "../config/db";
import { createProject } from "../db/projects";

const logger = async () => {
  await createProject({ title: "lol", authorId: 14 });
  // await prisma.project.deleteMany({});
  const users = await prisma.user.findMany({});
  const projects = await prisma.project.findMany({});
  const todos = await prisma.todo.findMany({});
  console.log("users");
  console.log(users);
  console.log("--------------");
  console.log("projects");
  console.log(projects);
  console.log("--------------");
  console.log("todos");
  console.log(todos);
};

// logger().then((res) => console.log(res));

// prisma.project.delete({ where: { id: 8 } }).then((res) => console.log(res));

// prisma.todo
//   .update({
//     where: { id: 8 },
//     data: { project: { connect: { id: 10 } } },
//   })
//   .then((res) => console.log(res));

// prisma.todo.findUnique({ where: { id: 8 } }).then((res) => console.log(res));

const checkNestedProjects = async (userId: number, projectId: number) => {
  const data = await prisma.user.findMany({
    where: { id: userId },
    select: { projects: { where: { id: projectId }, select: { todos: true } } },
  });
  if (!data[0].projects[0]) return false;
  if (!data[0].projects.length) return false;
  return data[0].projects[0].todos;
};

// checkNestedProjects(14, 10).then((res) => console.log(res));
// checkNestedProjects(14, 11).then((res) => console.log(res));
// checkNestedProjects(14, 11).then((res) => console.log(res));
// checkNestedProjects(14, 11).then((res) => console.log(res));
