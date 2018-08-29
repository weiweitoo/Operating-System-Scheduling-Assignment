import Vue from 'vue'
import Router from 'vue-router'
import RoundRobin from '@/pages/RoundRobin'
import FCFS from '@/pages/FCFS'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/round-robin',
      name: 'round-robin',
      component: RoundRobin
    },
    {
      path: '/fcfs',
      name: 'fcfs',
      component: FCFS
    }
  ]
})
