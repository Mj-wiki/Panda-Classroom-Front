import { message } from 'antd';
import { TBaseProduct, TProductQuery, TProductsQuery } from '@/utils/types';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { GET_PRODUCTS } from '@/graphql/product';
import { COMMIT_COURSE, GET_COURSE } from '../graphql/course';

export const useProducts = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const { loading, data, refetch } = useQuery<TProductsQuery>(GET_PRODUCTS, {
    skip: true,
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  });

  const refetchHandler = async (params: {
    name?: string;
    pageSize?: number;
    current?: number;
  }) => {
    const { data: res, errors } = await refetch({
      name: params.name,
      page: {
        pageNum: params.current || 1,
        pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
      },
    });

    if (errors) {
      return {
        success: false,
      };
    }
    return {
      total: res?.getProducts.page.total,
      data: res?.getProducts.data,
      success: true,
    };
  };

  return {
    loading,
    refetch: refetchHandler,
    page: data?.getProducts.page,
    data: data?.getProducts.data,
  };
};

export const useEditProductInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_COURSE);

  const handleEdit = async (
    id: number,
    params: TBaseProduct,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitProductInfo.code === 200) {
      message.success(res.data.commitProductInfo.message);
      callback(true);
      return;
    }
    message.error(res.data.commitProductInfo.message);
  };

  return [handleEdit, loading];
};

export const useProduct = () => {
  const [get, { loading }] = useLazyQuery(GET_COURSE);

  const getProduct = async (id: string) => {
    const res = await get({
      variables: {
        id,
      },
    });

    return res.data.getProductInfo.data;
  };

  return { getProduct, loading };
};

export const useProductInfo = (id: string) => {
  const { data, loading, refetch } = useQuery<TProductQuery>(GET_COURSE, {
    variables: {
      id,
    },
  });

  return { data: data?.getProductInfo.data, loading, refetch };
};
