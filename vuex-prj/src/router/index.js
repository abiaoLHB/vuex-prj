import Vue from 'vue'
import Router from 'vue-router'
import Display from '../components/display'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Display',
      component: Display
    }
  ]
})
