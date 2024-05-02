const fs = require("fs");
const path = require("path");

const rootDir = "/Users/raymond/Documents/next/next_v1";

// 更新 pages/user/luru.tsx
const luruContent = `
import React, { useState } from 'react';
import { 
  ProForm,
  ProFormText, 
  ProFormDatePicker, 
  ProFormSelect,
  ProFormTag,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
import axios from 'axios';

const actresses = ['演员1', '演员2', '演员3', '演员4', '演员5'];
const tags = ['标签1', '标签2', '标签3', '标签4', '标签5'];

const Luru = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSubmit = async (values) => {
    try {
      await axios.post('/api/luru', { ...values, tags: selectedTags });
      message.success('提交成功');
    } catch (error) {
      message.error('提交失败，请重试');
    }
  };

  return (
    <ProForm onFinish={handleSubmit}>
      <ProFormText name="number" label="号码" />
      <ProFormDatePicker name="publishDate" label="发布日期" />
      <ProFormSelect 
        name="actress" 
        label="演员名称"
        showSearch
        options={actresses.map(item => ({ label: item, value: item }))}
      />
      <ProFormTag.CheckableTag 
        name="tags"
        label="标签"
        options={tags.map(item => ({ label: item, value: item }))}
        onChange={setSelectedTags}
      />
      <ProFormTextArea name="remark" label="备注" />
    </ProForm>
  );
};

export default Luru;
`;

fs.writeFileSync(path.join(rootDir, "pages/user/luru.tsx"), luruContent);

// 更新 pages/api/luru.ts
const apiLuruContent = `
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { number, publishDate, actress, tags, remark } = req.body;

    try {
      await prisma.record.create({
        data: { number, publishDate, actress, tags, remark },  
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
`;

fs.writeFileSync(path.join(rootDir, "pages/api/luru.ts"), apiLuruContent);

// 更新 prisma/schema.prisma
const schemaContent = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
}

model Record {
  id          Int      @id @default(autoincrement())
  number      String
  publishDate DateTime
  actress     String
  tags        String
  remark      String?
}
`;

fs.writeFileSync(path.join(rootDir, "prisma/schema.prisma"), schemaContent);

console.log("页面、API和数据库schema已更新完成");