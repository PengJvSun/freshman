const adminRoutes = [
  {
    path: '/admin',
    models: () => [import('../models')],
    component: () => import('./AdminPage')
  },
  {
    path: '/login',
    models: () => [import('../models')],
    component: () => import('./LoginPage')
  },
  {
    path: '/admin/*',
    models: () => [import('../models')],
    component: () => import('../components/PageNotFound')
  }
];

export default adminRoutes;
