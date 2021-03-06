import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Tickets from '@/components/Tickets'
import Impersonate from '@/components/Impersonate'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [    
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/newticket',
      name: 'Home',
      component: Home
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: Tickets
    },{
      path: '/impersonate',
      name: 'Impersonate',
      component: Impersonate
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})

