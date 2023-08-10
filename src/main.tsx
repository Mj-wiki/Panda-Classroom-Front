import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { client } from './utils/apollo';
import { ROUTE_CONFIG } from './routes';
import UserInfo from './components/UserInfo';
import Layout from './components/Layout';
import Login from './containers/Login';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <UserInfo>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            {ROUTE_CONFIG.map((item) => (
              <Route
                path={item.path}
                key={item.key}
                element={<item.element />}
              />
            ))}
          </Route>
        </Routes>
      </UserInfo>
    </BrowserRouter>
  </ApolloProvider>,
);
