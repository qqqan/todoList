import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    // 登录      
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login'
  },
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
      }
    ]
  }, {
    // 日历
    path: '/calender',
    component: () => import('@/views/calender/index.vue'),
    name: 'calender'
  }, {
    // 更多功能
    path: '/more',
    component: () => import('@/views/more/index.vue'),
    name: 'more'
  }, {
    // 分析表
    path: '/charts',
    component: () => import('@/views/charts/index.vue'),
    name: 'charts'
  }

  ]
})

export default router
