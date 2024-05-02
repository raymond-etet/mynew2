import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { current = 1, pageSize = 10, ...filter } = req.query;
    const where = Object.entries(filter).reduce(
      (acc, [key, value]) => {
        if (value) {
          if (key === 'tags') {
            acc[key] = { contains: value as string };
          } else {
            acc[key] = { contains: value as string };
          }
        }
        return acc;
      }, 
      {} as Record<string, any>
    );

    try {
      const records = await prisma.record.findMany({
        where,
        skip: (Number(current) - 1) * Number(pageSize),  
        take: Number(pageSize),
      });
      const total = await prisma.record.count({ where }); 
      res.status(200).json({ data: records, total, success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}