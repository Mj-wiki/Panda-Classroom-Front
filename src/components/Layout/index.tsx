import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { useUserContext } from '@/hooks/userHooks';
import { AUTH_TOKEN } from '@/utils/constants';

import { routes } from '@/routes/menus';
import style from './index.module.less';

const menuItemRender = (
  item: MenuDataItem,
  dom: React.ReactNode,
) => <Link to={item.path || '/'}>{dom}</Link>;
/**
* 外层框架
*/
const Layout = () => {
  const outlet = useOutlet();
  const { store } = useUserContext();
  const nav = useNavigate();

  const logout = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };

  return (
    <ProLayout
      layout="mix"
      siderWidth={130}
      avatarProps={{
        src: '',
        title: store.tel,
        size: 'small',
        onClick: logout,
      }}
      title={false}
      logo={<img src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png" alt="logo" />}
      className={style.container}
      onMenuHeaderClick={() => nav('/')}
      route={{
        path: '/',
        routes,
      }}
      menuItemRender={menuItemRender}
    >
      <PageContainer>
        {outlet}
      </PageContainer>
    </ProLayout>
  );
};

export default Layout;
