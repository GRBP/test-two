import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //存储公共数据
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',

    tagArr: [],
    menuList: [
      {
        title: '学生',
        url: '/student',
        icon: 'el-icon-user-solid'
      },
      {
        title: '教师',
        url: '/teacher',
        icon: 'el-icon-user'
      },
      {
        title: '系统管理',
        url: '/system',
        icon: 'el-icon-setting',
        children: [
          {
            title: '日志管理',
            url: '/system/log',
            icon: ''
          }
        ]
      },
      {
        title: '台账管理',
        url: '/ledger',
        // icon:'el-icon-user-solid' role
      },
      {
        title: '角色管理',
        url: '/role',
        // icon:'el-icon-user-solid' 
      },
      {
        title: '用户管理',
        url: '/user',
        // icon:'el-icon-user-solid'
      },
      {
        title: '商品管理',
        url: '/commodity',
      },
      // {
      //   title: '财务管理',
      //   url: '/finance',
      // },
      {
        title: '字典管理',
        url: '/dictionary',
      },
      {
        title: '部门管理',
        url: '/department',
      },
      {
        title: '权限管理',
        url: '/permit',
      },
    ]
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  },
  actions: {
  },
  modules: {
  }
})
