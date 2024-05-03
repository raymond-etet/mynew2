
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
