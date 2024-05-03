// prisma/seed.mjs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 创建用户
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin',
    },
  });
  console.log({ user });

  // 创建演员
  for (const name of ['演员1', '演员2', '演员3', '演员4', '演员5']) {
    await prisma.actress.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 创建标签
  for (const name of ['标签1', '标签2', '标签3', '标签4', '标签5']) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
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