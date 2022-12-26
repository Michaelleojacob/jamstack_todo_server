import prisma from "../config/db";

// returns all users
const findUsers = async () =>
  await prisma.user.findMany({ select: { id: true, username: true } });
// findUsers().then((res) => console.log(res));

// returns user: {}, or null
const findUser = async (id: number) =>
  await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true },
  });
// findUser(15).then((res) => console.log(res));
// findUser(200).then((res) => console.log(res));

const userExists = async (id: number) =>
  !!(await prisma.user.findUnique({ where: { id } }));
// userExists(15).then((res) => console.log(res));

// return user info or null
const createUser = async (username: string, password: string) => {
  try {
    const user = await prisma.user.create({ data: { username, password } });
    return { username: user.username, id: user.id };
  } catch (e) {
    console.log(`err in createUser`, e);
    return null;
  }
};
// createUser("123", "lol").then((res) => console.log(res));

export { findUsers, findUser, userExists, createUser };
