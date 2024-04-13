import { lazy } from 'react';

const Device = lazy(() => import('../app/dashboard/admin/device/page'));
const Users = lazy(() => import('../app/dashboard/admin/users/page'));
const Sensors = lazy(() => import('../app/dashboard/admin/sensors/page'));
const Classroom = lazy(() => import('../app/dashboard/admin/classroom/page'));
const Settings = lazy(() => import('../app/dashboard/admin/Setting/page'));
const Chart = lazy(() => import('../app/dashboard/admin/chart/page'));


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
    path: '/dashboard/admin/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/dashboard/admin/Chart',
    title: 'Chart',
    component: Chart,
  }
];

const routes = [...coreRoutes];
export default routes;
