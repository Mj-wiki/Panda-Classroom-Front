import { TCourseQuery } from '@/utils/types';
import { useQuery } from '@apollo/client';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { GET_COURSES } from '../graphql/course';

export const useCourses = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const { loading, data, refetch } = useQuery<TCourseQuery>(GET_COURSES, {
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
        pageNum: params.current,
        pageSize: params.pageSize,
      },
    });

    if (errors) {
      return {
        success: false,
      };
    }
    return {
      total: res?.getCourses.page.total,
      data: res?.getCourses.data,
      success: true,
    };
  };

  return {
    loading,
    refetch: refetchHandler,
    page: data?.getCourses.page,
    data: data?.getCourses.data,
  };
};
