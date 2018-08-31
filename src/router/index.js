import Vue from 'vue'
import Router from 'vue-router'
import RoundRobin from '@/pages/RoundRobin'
import FCFS from '@/pages/FCFS'
import SRTN from '@/pages/SRTN'
import ThreeLevelQueue from '@/pages/ThreeLevelQueue'

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
    },
    {
      path: '/srtn',
      name: 'srtn',
      component: SRTN
    },
    {
      path: '/three-level-queue',
      name: 'three-level-queue',
      component: ThreeLevelQueue
    }
  ]
})
