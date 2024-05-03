const fs = require("fs");
const path = require("path");

const rootDir = "/Users/raymond/Documents/next/next_v1";

// 创建 src/layouts 目录
fs.mkdirSync(path.join(rootDir, "src", "layouts"), { recursive: true });

// 创建 BasicLayout.tsx
fs.writeFileSync(
    path.join(rootDir, "src", "layouts", "BasicLayout.tsx"),
    `import React, { FC } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

type BasicLayoutProps = {};

const BasicLayout: FC<BasicLayoutProps> = (props) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px' }}>
        <div style={{ padding: 24, minHeight: 360 }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default BasicLayout;
`
);

// 创建 UserLayout.tsx
fs.writeFileSync(
    path.join(rootDir, "src", "layouts", "UserLayout.tsx"),
    `import React, { FC } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

type UserLayoutProps = {};

const UserLayout: FC<UserLayoutProps> = (props) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px' }}>
        <div style={{ padding: 24, minHeight: 360 }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default UserLayout;
`
);

// 创建 src/routes 目录
fs.mkdirSync(path.join(rootDir, "src", "routes"), { recursive: true });

// 创建 config.tsx
fs.writeFileSync(
    path.join(rootDir, "src", "routes", "config.tsx"),
    `import React, { FC, Suspense } from 'react';
import { RouteProps } from 'react-router-dom';
import Loading from '@/components/Loading';
import PrivateRoute from './privateRoute';

export type WrapperRouteProps = RouteProps & {
  title?: string;
  auth?: boolean;
};

const PublicRoute = (props: any) => {
  return props.element;
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({
  title,
  auth,
  ...props
}) => {
  const WitchRoute = auth ? PrivateRoute : PublicRoute;

  if (title) {
    document.title = title;
  }
  return <WitchRoute {...props} />;
};

const WrapperRouteWithOutLayoutComponent: FC<WrapperRouteProps> = ({
  auth,
  ...props
}) => {
  return <Suspense fallback={<Loading />}>{props.element}</Suspense>;
};

export { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent };
`
);

// 创建 privateRoute.tsx
fs.writeFileSync(
    path.join(rootDir, "src", "routes", "privateRoute.tsx"),
    `import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = (props: any) => {
  const location = useLocation();
  const { pathname } = location;

  const token = localStorage.getItem('token');

  return token ? (
    pathname === '/' ? (
      <Navigate to={{ pathname: '/user' }} replace />
    ) : (
      props.element
    )
  ) : (
    <Navigate to={{ pathname: '/auth/login' }} replace />
  );
};

export default PrivateRoute;
`
);

// 创建 Redirect.tsx
fs.writeFileSync(
    path.join(rootDir, "src", "routes", "Redirect.tsx"),
    `import { FC, useEffect } from 'react';
import { useNavigate, NavigateProps } from 'react-router-dom';

type RedirectProps = NavigateProps;

const Redirect: FC<RedirectProps> = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace: true });
  });
  return null;
};

export default Redirect;
`
);

// 创建 src/routes/user 目录
fs.mkdirSync(path.join(rootDir, "src", "routes", "user"), { recursive: true });

// 创建 user/index.tsx
fs.writeFileSync(
    path.join(rootDir, "src", "routes", "user", "index.tsx"),
    `import React from 'react';
import { RouteObject } from 'react-router-dom';
import Redirect from '../Redirect';
import { WrapperRouteComponent } from '../config';
import UserCenter from '@/pages/user';

const UserRoute = () => {
  const routeList: RouteObject[] = [
    {
      path: '/user',
      element: <Redirect to="/user/index" />,
    },
    {
      path: '/user/index',
      element: (
        <WrapperRouteComponent element={<UserCenter />} title="用户中心" auth />
      ),
    },
  ];
  return routeList;
};

export default UserRoute;
`
);

// 修改 src/pages/_app.tsx
fs.writeFileSync(
    path.join(rootDir, "src", "pages", "_app.tsx"),
    `import 'uno.css';
import '@/styles/global.css';
import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '../theme/themeConfig';
import RenderRouter from '@/routes';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <RenderRouter>
      <Component {...pageProps} />
    </RenderRouter>
  </ConfigProvider>
);

export default App;
`
);

// 创建 src/routes/index.tsx
fs.writeFileSync(
    path.join(rootDir, "src", "routes", "index.tsx"),
    `import React, { lazy, FC, useEffect } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import NotFound from '@/pages/404';
import { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent } from './config';
import Redirect from './Redirect';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import user from './user';

NProgress.configure({ showSpinner: false });
const Login = lazy(() => import('@/pages/auth/login'));
const Register = lazy(() => import('@/pages/auth/register'));

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <WrapperRouteComponent element={<BasicLayout />} />,
    children: [
      {
        path: '/',
        element: <Redirect to="/user" />,
      },
    ],
  },
  {
    path: '/user',
    element: <WrapperRouteComponent element={<UserLayout />} auth />,
    children: [...user()],
  },
  {
    path: '/auth',
    element: <WrapperRouteWithOutLayoutComponent element={<UserLayout />} />,
    children: [
      {
        path: '/auth/login',
        element: <WrapperRouteWithOutLayoutComponent element={<Login />} title="登录" />,
      },
      {
        path: '/auth/register',
        element: <WrapperRouteWithOutLayoutComponent element={<Register />} title="注册" />,
      },
    ],
  },
  {
    path: '*' || '/404',
    element: <WrapperRouteWithOutLayoutComponent element={<NotFound />} title="404" />,
  },
];

const RenderRouter: FC = () => {
  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  });
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
`
);

console.log("项目架构优化完成！");