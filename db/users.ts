import prisma from "../config/db";

// returns all users
export const findUsers = async () =>
  await prisma.user.findMany({ select: { id: true, username: true } });
// findUsers().then((res) => console.log(res));

// returns user: {id, username}, or false
export const findUser = async (id: number) =>
  await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true },
  });
// findUser(15).then((res) => console.log(res));
// findUser(200).then((res) => console.log(res));

// by name for sign up. No id/token yet. Needs the password.
export const findUserByName = async (username: string) =>
  await prisma.user.findUnique({ where: { username } });

export const isNameAvailable = async (username: string) =>
  !!(await prisma.user.findUnique({ where: { username } }));

export const userExists = async (id: number) =>
  !!(await prisma.user.findUnique({ where: { id } }));
// userExists(15).then((res) => console.log(res));

// return user msg or false
export const createUser = async (username: string, password: string) => {
  try {
    const user = await prisma.user.create({ data: { username, password } });
    return { username: user.username, id: user.id };
  } catch (e) {
    console.log(e, `err in createUser`);
    return false;
  }
};
// createUser("123", "lol").then((res) => console.log(res));
