
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
