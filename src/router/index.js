import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

const login = () =>
  import('@/components/Login')

Vue.use(Router)

// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
  store.commit('set_roleCodes', sessionStorage.getItem('userType'))
}

export default new Router({
  mode: 'history',
  base: '/cmsAdmin/',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      component: login

    }
  ]
})
