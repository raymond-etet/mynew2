const fs = require("fs");
const path = require("path");

const rootDir = "/Users/raymond/Documents/next/next_v1";

// 创建演员页面
const actressPageContent = `
import React from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import axios from 'axios';

const Yanyuan = () => {
  const handleSubmit = async (values) => {
    try {
      await axios.post('/api/actress', values);
      message.success('提交成功');
    } catch (error) {
      message.error('提交失败，请重试');
    }
  };

  return (
    <ProForm onFinish={handleSubmit}>
      <ProFormText name="name" label="演员名" />
    </ProForm>
  );
};

export default Yanyuan;
`;
fs.writeFileSync(path.join(rootDir, 'pages', 'user', 'yanyuan.tsx'), actressPageContent);

// 创建标签页面
const tagPageContent = `
import React from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import axios from 'axios';

const Biaoqian = () => {
  const handleSubmit = async (values) => {
    try {
      await axios.post('/api/tag', values);
      message.success('提交成功');
    } catch (error) {
      message.error('提交失败，请重试');
    }
  };

  return (
    <ProForm onFinish={handleSubmit}>
      <ProFormText name="name" label="标签名" />
    </ProForm>
  );
};

export default Biaoqian;
`;
fs.writeFileSync(path.join(rootDir, 'pages', 'user', 'biaoqian.tsx'), tagPageContent);

// 修改Layout组件
const layoutContent = `
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, TagsOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('luru', '1', <MailOutlined />, [
    getItem(<Link href="/user/luru">Profile</Link>, '1'),
    getItem(<Link href="/user/yanyuan">Yanyuan</Link>, '4'),
    getItem(<Link href="/user/biaoqian">Biaoqian</Link>, '5'),
  ]),
  getItem('show', '2', <AppstoreOutlined />, [
    getItem(<Link href="/user/show">Settings</Link>, '2'),
  ]),
  getItem('Notifications', '3', <SettingOutlined />, [
    getItem(<Link href="/user/settings">Notifications</Link>, '3'),
  ]),
];

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [typeof window !== 'undefined' && localStorage.getItem('token')]);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isLoggedIn && (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
      )}
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>  
        </Content>
      </Layout>
    </Layout>
  );
};

export default GlobalLayout;
`;
fs.writeFileSync(path.join(rootDir, 'src', 'components', 'Layout', 'index.tsx'), layoutContent);

// 创建演员API
const actressApiContent = `
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name } = req.body;

    try {
      await prisma.actress.create({
        data: {
          name,
        },
      });
      res.status(201).json({ message: 'Actress created successfully' });
    } catch (error) {
      console.error(error);  
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
`;
fs.writeFileSync(path.join(rootDir, 'pages', 'api', 'actress.ts'), actressApiContent);

// 创建标签API
const tagApiContent = `
import { PrismaClient } from '@prisma/client';  
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name } = req.body;

    try {
      await prisma.tag.create({
        data: {
          name,
        },
      });
      res.status(201).json({ message: 'Tag created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}  
`;
fs.writeFileSync(path.join(rootDir, 'pages', 'api', 'tag.ts'), tagApiContent);

// 修改Profile页面
const profileContent = `
import React from 'react';
import {
  ProForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message, Tag } from 'antd';
import axios from 'axios';

const Luru = ({ actresses, tags }) => {
  const handleSubmit = async (values) => {
    try {
      await axios.post('/api/luru', values);
      message.success('提交成功');
    } catch (error) {
      message.error('提交失败，请重试');
    }
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    return (
      <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
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
      <ProFormSelect
        name="tags"
        label="标签"
        mode="multiple"
        showSearch
        options={tags.map((item) => ({ label: item.name, value: item.name }))}
        fieldProps={{
          tagRender,
        }}
      />
      <ProFormTextArea name="remark" label="备注" />
    </ProForm>
  );
};

export async function getStaticProps() {
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
fs.writeFileSync(path.join(rootDir, 'pages', 'user', 'luru.tsx'), profileContent);

// 插入默认的演员和标签数据
const defaultDataContent = `
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultActresses = [
    { name: '三上悠亚' },
    { name: '桥本有菜' },
    { name: '明日花绮罗' },
    { name: '高橋圣子' },
    { name: '水卜樱' },
  ];

  const defaultTags = [
    { name: '无码' },
    { name: '有码' },
    { name: '口交' },
    { name: '中出' },
    { name: '潮吹' },
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
`;
fs.writeFileSync(path.join(rootDir, 'prisma', 'seed.ts'), defaultDataContent);

console.log('所有操作已完成。');