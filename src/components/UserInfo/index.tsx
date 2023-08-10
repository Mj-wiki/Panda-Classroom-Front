import { IPropChild } from '../../utils/types';
import { connect, useGetUser } from '../../utils/userHooks';

/**
* 获取用户信息组件
*/
const UserInfo = ({ children }: IPropChild) => {
  useGetUser();
  return (
    <div>
      {children}
    </div>
  );
};

export default connect(UserInfo);
