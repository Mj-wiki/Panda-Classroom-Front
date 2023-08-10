import { currentOrg } from '@/utils';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { message } from 'antd';
import { onError } from '@apollo/client/link/error'; // 引入onError
import { AUTH_TOKEN } from './constants';

const uri = '/graphql';

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      orgId: currentOrg()?.value,
    },
  };
});

const errorLink = onError(({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    message.error('请求参数或者返回的数据格式不对');
    graphQLErrors.forEach((item) => {
      if (item.message === 'Unauthorized') {
        message.error('登录失效，请登录');
      }
    });
  }
  if (networkError) {
    message.error(networkError.message);
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
