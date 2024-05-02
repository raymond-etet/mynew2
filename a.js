const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = '/Users/raymond/Documents/next/next_v1';

// Update schema.prisma
const schemaPrismaPath = path.join(rootDir, 'prisma', 'schema.prisma');
const schemaPrismaContent = `
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Record {
  id          Int      @id @default(autoincrement())
  number      String
  publishDate DateTime
  actress     String
  tags        String
  remark      String?
}

model User {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
}
`;
fs.writeFileSync(schemaPrismaPath, schemaPrismaContent);

// Run Prisma migration
execSync('npx prisma migrate dev --name add_record_table', { stdio: 'inherit', cwd: rootDir });

// Update pages/api/records.ts
const apiRecordsPath = path.join(rootDir, 'pages', 'api', 'records.ts');
const apiRecordsContent = `
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const records = await prisma.record.findMany();
      res.status(200).json(records);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
`;
fs.writeFileSync(apiRecordsPath, apiRecordsContent);

// Update pages/user/show.tsx
const showTsxPath = path.join(rootDir, 'pages', 'user', 'show.tsx');
const showTsxContent = `
import React, { useState, useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import axios from 'axios';

const Show = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get('/api/records');
      setRecords(response.data);
    };
    fetchRecords();
  }, []);

  const columns = [
    {
      title: '号码',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
      key: 'publishDate',
    },
    {
      title: '演员名称',
      dataIndex: 'actress',
      key: 'actress',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  return <ProTable dataSource={records} columns={columns} rowKey="id" />;
};

export default Show;
`;
fs.writeFileSync(showTsxPath, showTsxContent);

console.log('Migration and updates completed successfully.');