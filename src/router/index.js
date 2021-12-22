import Vue from 'vue'
import VueRouter from 'vue-router'
import BrowseCourses from '../pages/Learner/BrowseCourses.vue'
import Home from "../pages/Guest/Home.vue"
import CourseInfo from "../pages/Learner/CourseInfo.vue"
import CourseContent from "../pages/Learner/CourseContent.vue"
import CourseDiscussions from "../pages/Learner/CourseDiscussions.vue"

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
  },
  {
    path: '/courses/info/:course_id',
    name: 'CourseInfo',
    component: CourseInfo
  },
  {
    path: '/courses/content/:course_id',
    name: 'CourseContent',
    component: CourseContent
  },
  {
    path: '/courses/discussions/:course_id',
    name: 'CourseDiscussions',
    component: CourseDiscussions
  }
  
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
