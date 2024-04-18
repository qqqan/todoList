import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    // 登录      
    path: '/',
    component: () => import('@/views/login/index.vue'),
    name: 'Login'
  },
  {
    path: '/layout',
    component: () => import('@/views/layout/index.vue'),
    name: 'Layout',
    redirect: 'Home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home'

      }, {
        // 日历
        path: '/calender',
        component: () => import('@/views/calender/index.vue'),
        name: 'Calender'
      }, {
        // 更多功能
        path: '/more',
        component: () => import('@/views/more/index.vue'),
        name: 'More'
      }, {
        // 分析表
        path: '/charts',
        component: () => import('@/views/charts/index.vue'),
        name: 'Charts'
      }

    ]
  },

  ]
})

export default router
