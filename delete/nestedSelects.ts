import prisma from "../config/db";
import { createProject } from "../utils/db/projects";

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

const checkNestedProjects = async (userId: number, projectId: number) => {
  return await prisma.user.findMany({
    where: { id: userId },
    include: { projects: true },
  });
};

checkNestedProjects(14, 10).then((res) => console.log(res));
