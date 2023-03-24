import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),// 侧边栏
    children: [
      { path: '', redirect: 'Chat' },  // 组件
      { path: 'Chat', component: () => import('pages/Chat.vue') },
      { path: 'Template', component: () => import('pages/Template.vue') },
      { path: 'User', component: () => import('src/pages/User.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
