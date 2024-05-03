import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultActresses = [
    { name: '演员1' },
    { name: '演员2' },
    { name: '演员3' },
    { name: '演员4' },
    { name: '演员5' },
  ];

  const defaultTags = [
    { name: '标签1' },
    { name: '标签2' },
    { name: '标签3' },
    { name: '标签3' },
    { name: '标签4' },
  ];

  for (const actress of defaultActresses) {
    await prisma.actress.create({ data: actress });
  }

  for (const tag of defaultTags) {
    await prisma.tag.create({ data: tag });
  }
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });