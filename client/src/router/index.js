import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Passwords from '@/components/Passwords'
import NewLogin from '@/components/NewLogin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/passwords',
      name: 'Passwords',
      component: Passwords
    },
    {
      path: '/logins/new',
      name: 'NewLogin',
      component: NewLogin
    }
  ]
})
