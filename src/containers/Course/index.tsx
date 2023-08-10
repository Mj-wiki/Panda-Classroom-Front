import { ICourse } from '@/utils/types';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useCourses } from '@/services/course';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { COLUMNS } from './constants';

/**
* 当前门店下开设的课程
*/
const Course = () => {
  const { refetch } = useCourses();
  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable<ICourse>
        columns={COLUMNS}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        request={refetch}
      />
    </PageContainer>
  );
};

export default Course;
