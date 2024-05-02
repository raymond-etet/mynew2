// /Users/raymond/Documents/next/next_v1/src/components/Layout/index.tsx
import React, {useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
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