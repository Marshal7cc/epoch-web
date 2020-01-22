import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import store from '@/store/index'
import NProgress from 'nprogress'
import { getUserMenu } from '@/api/system/menu'

import 'nprogress/nprogress.css'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

/**
 * 动态菜单
 */
export let asyncRoutes

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    const token = localStorage.getItem('access_token')
    const userRouter = JSON.parse(localStorage.getItem('user_route'))
    if (token) {
      if (!asyncRoutes) {
        if (!userRouter) {
          getUserMenu().then((res) => {
            asyncRoutes = res.data.rows
            localStorage.setItem('user_route', JSON.stringify(asyncRoutes))
            store.commit('account/setRoutes', asyncRoutes)
            go(to, next)
          })
        } else {
          asyncRoutes = userRouter
          go(to, next)
        }
      } else {
        next()
      }
    } else {
      // 无token时未登录跳转至登录页
      if (to.path === '/login') {
        next()
      } else {
        next('/login')
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

function go(to, next) {
  asyncRoutes = filterAsyncRouter(asyncRoutes)
  router.addRoutes(asyncRoutes)
  next({ ...to, replace: true })
}

function filterAsyncRouter(routes) {
  return routes.filter((route) => {
    const component = route.component
    if (component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = view(component)
      }
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    }
  })
}

function view(path) {
  return function(resolve) {
    import(`@/views/${path}.vue`).then(mod => {
      resolve(mod)
    })
  }
}

export default router
