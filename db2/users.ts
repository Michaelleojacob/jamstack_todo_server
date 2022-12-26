import prisma from "../config/db";

// returns all users
const findUsers = async () => await prisma.user.findMany({});
// findUsers().then((res) => console.log(res));

// returns user: {}, or null
const findUser = async (id: number) =>
  await prisma.user.findUnique({ where: { id } });
// findUser(14).then((res) => console.log(res));
// findUser(200).then((res) => console.log(res));

/**
 * create user
 * or if username is taken:
 * return null
 */
const createUser = async (username: string, password: string) => {
  try {
    return await prisma.user.create({ data: { username, password } });
  } catch (e) {
    console.log(`err in createUser`, e);
    return null;
  }
};
// createUser("123", "lol").then((res) => console.log(res));
