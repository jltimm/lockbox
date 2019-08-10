import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Logins from '@/components/Logins'
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
      path: '/logins',
      name: 'Logins',
      component: Logins
    },
    {
      path: '/logins/new',
      name: 'NewLogin',
      component: NewLogin
    }
  ]
})
