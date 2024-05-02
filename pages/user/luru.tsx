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

const actresses = ['演员1', '演员2', '演员3', '演员4', '演员5'];
const tags = ['标签1', '标签2', '标签3', '标签4', '标签5'];

const Luru = () => {
    const handleSubmit = async (values: any) => {
        try {
            await axios.post('/api/luru', values);
            message.success('提交成功');
        } catch (error) {
            message.error('提交失败，请重试');
        }
    };

    const tagRender = (props: any) => {
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
                options={actresses.map(item => ({ label: item, value: item }))}
            />
            <ProFormSelect
                name="tags"
                label="标签"
                mode="multiple"
                showSearch
                options={tags.map(item => ({ label: item, value: item }))}
                fieldProps={{
                    tagRender,
                }}
            />
            <ProFormTextArea name="remark" label="备注" />
        </ProForm>
    );
};

export default Luru;