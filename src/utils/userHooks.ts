import { useQuery } from '@apollo/client';
import { useAppContext, connectFactory } from './contextFactory';
import { GET_USER } from '../graphql/user';
import { IUser } from './types';

const KEY = 'userInfo';
const DEFAULT_VALUE = {

};

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
  const { setStore } = useUserContext();
  useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const { id, name, tel } = data.getUserInfo;
        setStore({
          id, name, tel,
        });
        return;
      }
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    },
    onError: () => {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    },
  });
};
