import React, { useRef } from 'react';
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

export default Show;