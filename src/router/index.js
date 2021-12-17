import Vue from 'vue'
import VueRouter from 'vue-router'
import BrowseCourses from '../pages/Learner/BrowseCourses.vue'
import Home from "../pages/Guest/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/courses',
    name: 'Courses',
    component: BrowseCourses
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
