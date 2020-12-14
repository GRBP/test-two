import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ledger'
    // redirect: '/login'
  },
  {
    path: '/demo',
    component: () => import("@/components/demo")
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/components/Login"),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import("@/components/Home"),
    children: [
      {
        path: 'student',
        name: 'studnet',
        component: () => import('@/views/Student'),
        meta: {
          title: '学生'
        }
      },
      {
        path: 'teacher',
        name: 'teacher',
        component: () => import('@/views/Teacher'),
        meta: {
          title: '老师'
        }
      },
      {
        path: 'system/log',
        name: 'system/log',
        component: () => import('@/views/system/Log'),
        meta: {
          title: '系统日志'
        }
      },
      {
        path: 'ledger',
        name: 'ledger',
        component: () => import('@/views/ledger/LedgerIndex'),
        meta: {
          title: '台账管理'
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/role/LedgerIndex'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/LedgerIndex'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'commodity',
        name: 'commodity',
        component: () => import('@/views/commodity/Index'),
        meta: {
          title: '商品管理'
        }
      },
      // {
      //   path: 'finance',
      //   name: 'finance',
      //   component: () => import('@/views/Finance'),
      //   meta: {
      //     title: '财务管理'
      //   }
      // },
      {
        path: 'dictionary',
        name: 'dictionary',
        component: () => import('@/views/dictionary/Index'),
        meta: {
          title: '字典管理'
        }
      },
      {
        path: 'department',
        name: 'department',
        component: () => import('@/views/department/Index'),
        meta: {
          title: '部门管理'
        }
      },
      {
        path: 'permit',
        name: 'permit',
        component: () => import('@/views/permit/Index'),
        meta: {
          title: '权限管理'
        }
        
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
})

export default router
