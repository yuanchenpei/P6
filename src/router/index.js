import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: 'visualization',
    children: [
      {
        path: 'visualization',
        name: 'Visualization',
        component: () => import('../views/Visualization.vue'),
      },
      {
        path: 'visualilol',
        name: 'VisualiLOL',
        component: () => import('../views/VisualiLOL.vue'),
      },
      {
        path: 'weibo',
        name: 'Weibo',
        component: () => import('../views/Weibo.vue'),
      },
      {
        path: 'publicOpinion',
        name: 'PublicOpinion',
        component: () => import('../views/PublicOpinion.vue'),
      },
      {
        path: 'weiboExcel',
        name: 'WeiboExcel',
        component: () => import('../views/WeiboExcel.vue'),
      },
      {
        path: 'publicOpinionExcel',
        name: 'PublicOpinionExcel',
        component: () => import('../views/PublicOpinionExcel.vue'),
      },
      {
        path: 'changePassWord',
        name: 'ChangePassWord',
        component: () => import('../views/ChangePassWord.vue'),
      },

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '*',
    name: 'Page404',
    component: () => import('../views/Page404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('token')
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
