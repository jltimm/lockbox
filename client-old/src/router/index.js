import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Logins from '@/components/Logins'
import EditLogin from '@/components/EditLogin'

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
      path: '/logins/:id',
      name: 'EditLogin',
      component: EditLogin,
      alias: 'logins/new',
      props: true
    }
  ]
})
