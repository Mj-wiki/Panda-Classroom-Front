import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { client } from './utils/apollo';
import { routes } from './routes/menus';
import UserInfo from './components/UserInfo';
import Layout from './components/Layout';
import Login from './containers/Login';
import { ROUTE_COMPONENT } from './routes';
import 'dayjs/locale/zh-cn';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <UserInfo>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              {routes.map((item) => {
                const Component = ROUTE_COMPONENT[item.key];
                return (
                  <Route
                    path={item.path}
                    key={item.key}
                    element={<Component />}
                  />
                );
              })}
            </Route>
          </Routes>
        </UserInfo>
      </BrowserRouter>
    </ConfigProvider>
  </ApolloProvider>,
);
