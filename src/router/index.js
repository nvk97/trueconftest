import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Red from  '../views/Red'
import Yellow from  '../views/Yellow'
import Green from  '../views/Green'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/red',
    component: Red,
    props:{routeContext:'red',totalTicks:10,toRedirect:'yellow'}   // Передаю через пропсы контекст роутера(Мне кажется это более гибким решением нежели запрашивать этот контекст из компонента)
  },
  {
    path:'/yellow',
    component: Yellow,
    props:{routeContext:'yellow',totalTicks:3,toRedirect:"needToComputed"}  // Передаю через пропсы контекст роутера(Мне кажется это более гибким решением нежели запрашивать этот контекст из компонента)
  },
  {
    path:'/green',
    component: Green,
    props:{routeContext:'green',totalTicks:15,toRedirect:'yellow'}  // Передаю через пропсы контекст роутера(Мне кажется это более гибким решением нежели запрашивать этот контекст из компонента)
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
