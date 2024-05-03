import React from 'react';
import { ProForm, ProFormText, ProFormDatePicker, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import { message, Tag } from 'antd';
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
