import prisma from "../config/db";

// either returns a user or null
const findUserById = async (userId: number) =>
  await prisma.user.findUnique({ where: { id: userId } });

// either returns a user or null
const findUserByUserName = async (username: string) =>
  await prisma.user.findUnique({ where: { username } });

/**
 * username is available: true
 * username is taken: false
 */
const isNameAvailable = async (username: string) =>
  (await prisma.user.findUnique({ where: { username } })) ? false : true;

// creates a new user
const createUser = async (username: string, password: string) =>
  await prisma.user.create({ data: { username, password } });

export { findUserById, findUserByUserName, createUser, isNameAvailable };
