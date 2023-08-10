import Home from '@/containers/Home';
import Page404 from '@/containers/Page404';
import { HomeOutlined } from '@ant-design/icons';

export const ROUTE_CONFIG = [
  {
    key: 'home',
    path: '/home',
    element: Home,
    name: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: '*',
    path: '*',
    hideInMenu: true,
    element: Page404,
    name: '404',
  },
];
