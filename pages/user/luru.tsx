import React from 'react';
import {
    ProForm,
    ProFormText,
    ProFormDatePicker,
    ProFormSelect,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
import axios from 'axios';

const actresses = ['演员1', '演员2', '演员3', '演员4', '演员5'];
const tags = ['标签1', '标签2', '标签3', '标签4', '标签5'];

const Luru = () => {
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
                options={actresses.map(item => ({ label: item, value: item }))}
            />
            <ProFormSelect
                name="tags"
                label="标签"
                mode="tags"
                options={tags.map(item => ({ label: item, value: item }))}
            />
            <ProFormTextArea name="remark" label="备注" />
        </ProForm>
    );
};

export default Luru;