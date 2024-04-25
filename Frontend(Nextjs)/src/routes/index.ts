import { lazy } from 'react';


//page
const Device = lazy(() => import('../app/dashboard/admin/device/page'));
const Users = lazy(() => import('../app/dashboard/admin/users/page'));
const Sensors = lazy(() => import('../app/dashboard/admin/sensors/page'));
const history = lazy(() => import('../app/dashboard/admin/history/page'));
const Classroom = lazy(() => import('../app/dashboard/admin/classroom/page'));

//table
const UserDetail = lazy(() => import('../app/dashboard/admin/users/detail/page'));
const SensorDetail = lazy(() => import('../app/dashboard/admin/sensors/detail/page'));
const ClassroomDetail = lazy(() => import('../app/dashboard/admin/classroom/detail/page'));
const DeviceDetail = lazy(() => import('../app/dashboard/admin/device/detail/page'));

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
    path: '/dashboard/admin/device/detail',
    title: 'DeviceDetail',
    component: DeviceDetail,
  },
  {
    path: '/dashboard/admin/sensors/detail',
    title: 'SensorDetail',
    component: SensorDetail,
  },
  {
    path: '/dashboard/admin/classroom/detail',
    title: 'ClassroomDetail',
    component: ClassroomDetail,
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
