import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  await prisma.project.deleteMany({});
  await prisma.todo.deleteMany({});
  await prisma.user.deleteMany({});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
