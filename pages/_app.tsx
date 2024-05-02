// /Users/raymond/Documents/next/next_v1/pages/_app.tsx
import 'uno.css';
import '@/styles/global.css';
import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '../theme/themeConfig';
import GlobalLayout from '@/components/Layout';

const App = ({ Component, pageProps }: AppProps) => (
    <ConfigProvider theme={theme}>
        <GlobalLayout>
            <Component {...pageProps} />
        </GlobalLayout>
    </ConfigProvider>
);

export default App;
