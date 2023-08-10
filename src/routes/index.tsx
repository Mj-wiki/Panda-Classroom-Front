import Home from '@/containers/Home';
import My from '@/containers/My';
import Page404 from '@/containers/Page404';
import { ROUTE_KEY } from './menus';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.PAGE_404]: Page404,
};
