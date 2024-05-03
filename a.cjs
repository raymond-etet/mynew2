const fs = require("fs");
const path = require("path");
const rootDir = "/Users/raymond/Documents/next/next_v1";

// 修改 pages/user/luru.tsx
const luruContent = `import React from 'react';
import { ProForm, ProFormText, ProFormDatePicker, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import { message, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const Luru = ({ actresses, tags }) => {
  const handleSubmit = async (values) => {
    try {
      await axios.post('/api/luru', values);
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
        options={actresses.map((item) => ({ label: item.name, value: item.name }))}
      />
      <ProForm.Item name="tags" label="标签">
        <Checkbox.Group>
          <Row gutter={[16, 16]}>
            {tags.map((tag) => (
              <Col key={tag.id}>
                <Checkbox value={tag.name}>{tag.name}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </ProForm.Item>
      <ProFormTextArea name="remark" label="备注" />
    </ProForm>
  );
};

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const actresses = await prisma.actress.findMany();
    const tags = await prisma.tag.findMany();
    await prisma.$disconnect();

    return {
        props: {
            actresses,
            tags,
        },
    };
}

export default Luru;
`;

fs.writeFileSync(path.join(rootDir, "pages", "user", "luru.tsx"), luruContent);

// 修改 pages/api/luru.ts
const apiLuruContent = `import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { number, publishDate, actress, tags, remark } = req.body;

    try {
      await prisma.record.create({
        data: {
          number,
          publishDate: new Date(publishDate),
          actress,
          tags,
          remark
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
`;

fs.writeFileSync(path.join(rootDir, "pages", "api", "luru.ts"), apiLuruContent);