import { lazy } from 'react';

const Device = lazy(() => import('../app/dashboard/admin/device/page'));
const Users = lazy(() => import('../app/dashboard/admin/users/page'));
const UserDetail = lazy(() => import('../app/dashboard/admin/users/detail/page'));
const Sensors = lazy(() => import('../app/dashboard/admin/sensors/page'));
const history = lazy(() => import('../app/dashboard/admin/history/page'));
const Classroom = lazy(() => import('../app/dashboard/admin/classroom/page'));

const coreRoutes = [
  {
    path: '/dashboard/admin/device',
    title: 'Device',
    component: Device,
  },  
  {
    path: '/dashboard/admin/users',
    title: 'Users',
    component: Users,
  },
  {
    path: '/dashboard/admin/users/detail',
    title: 'DetailUser',
    component: UserDetail,
  },
  {
    path: '/dashboard/admin/sensors',
    title: 'Sensors',
    component: Sensors,
  },
  {
    path: '/dashboard/admin/classroom',
    title: 'Classroom',
    component: Classroom,
  },
  {
    path: '/dashboard/admin/history',
    title: 'Settings',
    component: history,
  },
  // {
  //   path: '/dashboard/admin/Chart',
  //   title: 'Chart',
  //   component: Chart,
  // }
];

const routes = [...coreRoutes];
export default routes;
