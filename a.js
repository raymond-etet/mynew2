const fs = require("fs");
const path = require("path");

const rootDir = "/Users/raymond/Documents/next/next_v1";

// 更新 pages/api/records.ts
fs.writeFileSync(
    path.join(rootDir, "pages/api/records.ts"),
    `import { PrismaClient } from '@prisma/client';
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
}`
);

// 更新 pages/user/show.tsx
fs.writeFileSync(
    path.join(rootDir, "pages/user/show.tsx"),
    `import React, { useRef } from 'react';
import { ProTable, ActionType } from '@ant-design/pro-components';
import { Input, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const actresses = ['演员1', '演员2', '演员3', '演员4', '演员5'];
const tags = ['标签1', '标签2', '标签3', '标签4', '标签5'];

const Show = () => {
  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: '号码',
      dataIndex: 'number',
      key: 'number',
      renderFormItem: () => <Input placeholder="请输入号码" />,
    },
    {
      title: '发布日期',  
      dataIndex: 'publishDate',
      key: 'publishDate',
      valueType: 'date',
    },
    {
      title: '演员名称',
      dataIndex: 'actress',
      key: 'actress',
      renderFormItem: () => (
        <Select placeholder="请选择演员" allowClear>
          {actresses.map((actress) => (
            <Option key={actress} value={actress}>
              {actress}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      renderFormItem: () => (
        <Select placeholder="请选择标签" mode="tags" allowClear>
          {tags.map((tag) => (
            <Option key={tag} value={tag}>
              {tag}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      request={async (params, sorter, filter) => {
        const { data, total, success } = await axios
          .get('/api/records', {
            params: {
              ...params,
              ...filter,
            },
          })
          .then((res) => res.data);
        return {
          data,
          total,
          success,
        };
      }}
      rowKey="id"
      search={{ layout: 'vertical' }}
    />
  );
};

export default Show;`
);

console.log('代码更新完成!');