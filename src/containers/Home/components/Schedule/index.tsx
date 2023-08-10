import { useSchedules } from '@/services/dashboard';
import {
  Avatar, Descriptions, Space, Steps,
} from 'antd';
import style from './index.module.less';

interface IProps {
  day: string
}

/**
* 某一天的课程表
*/
const Schedule = ({
  day,
}: IProps) => {
  const { data } = useSchedules(day);

  return (
    <div className={style.container}>
      <Steps
        direction="vertical"
        items={
          data?.map((item) => ({
            title: `${item.startTime}-${item.endTime} ${item.course.name}`,
            description: (
              <Descriptions bordered size="small">
                <Descriptions.Item
                  span={3}
                  label="讲师"
                >
                  <Space>
                    {
                    item.course.teachers.map((teacher) => (
                      <Space key={teacher.id}>
                        <Avatar
                          shape="square"
                          size="small"
                          src={teacher.photoUrl}
                        />
                        {teacher.name}
                      </Space>
                    ))
                  }
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item
                  span={3}
                  label={`学员(${item.course.teachers.length})`}
                  labelStyle={{
                    width: 80,
                  }}
                >
                  <Avatar.Group
                    maxCount={10}
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  >
                    {
                    item.course.teachers.map((teacher) => (
                      <Avatar
                        key={teacher.id}
                        src={teacher.photoUrl}
                      />
                    ))
                  }
                  </Avatar.Group>
                </Descriptions.Item>
              </Descriptions>
            ),
          }))
        }
      />
    </div>
  );
};

export default Schedule;
