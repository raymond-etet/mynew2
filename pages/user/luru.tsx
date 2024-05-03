import React from 'react';
import { ProForm, ProFormText, ProFormDatePicker, ProFormSelect, ProFormTextArea, ProFormRate } from '@ant-design/pro-components';
import { message, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const Luru = ({ actresses, tags }:any) => {
    const handleSubmit = async (values:any) => {
        try {
            await axios.post('/api/luru', values);
            message.success('提交成功');
        } catch (error) {
            message.error('提交失败,请重试');
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
                options={actresses.map((item:any) => ({ label: item.name, value: item.name }))}
            />
            <ProForm.Item name="tags" label="标签">
                <Checkbox.Group>
                    <Row gutter={[16, 16]}>
                        {tags.map((tag:any) => (
                            <Col key={tag.id}>
                                <Checkbox value={tag.name}>{tag.name}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            </ProForm.Item>
            <ProFormRate name="yanzhi" label="颜值" />
            <ProFormRate name="shengao" label="身高" />
            <ProFormRate name="tixing" label="体型" />
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