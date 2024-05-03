import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { number, publishDate, actress, tags, remark, yanzhi, shengao, tixing } = req.body;

    try {
      await prisma.record.create({
        data: {
          number,
          publishDate: new Date(publishDate),
          actress,
          tags: tags.join(','),
          remark,
          yanzhi: Number(yanzhi),
          shengao: Number(shengao),
          tixing: Number(tixing),
        },
      });
      res.status(201).json({ message: 'Record created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}