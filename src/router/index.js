import Vue from 'vue'
import VueRouter from 'vue-router'
import BrowseCourses from '../pages/Learner/BrowseCourses.vue'
import Home from "../pages/Guest/Home.vue"
import CourseInfo from "../pages/Learner/CourseInfo.vue"
import CourseContent from "../pages/Learner/CourseContent.vue"
import CourseDiscussions from "../pages/Learner/CourseDiscussions.vue"
import ThreadReplies from "../pages/Learner/ThreadReplies.vue"
import AdminHome from "../pages/Admin/AdminHome.vue"

import SignUp from "../pages/UserManagement/SignUp.vue"
import Login from "../pages/UserManagement/Login.vue"

import Profile from "../pages/UserManagement/Profile.vue"
import instructorDashboard from "../pages/Instructor/instructorDashboard.vue"
import instructor from '../store/modules/instructor'

Vue.use(VueRouter)

const routes = [
  {
    path: '/courses',
    name: 'Courses',
    component: BrowseCourses,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/courses/info/:course_id',
    name: 'CourseInfo',
    component: CourseInfo,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/courses/content/:course_id',
    name: 'CourseContent',
    component: CourseContent,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/courses/discussions/:course_id',
    name: 'CourseDiscussions',
    component: CourseDiscussions,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/courses/discussions/replies/:thread_id',
    name: 'ThreadReplies',
    component: ThreadReplies,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
    meta: {
      allowAnonymous: false
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      allowAnonymous: false
    }
  },
  {
    path: '/instructor',
    name : instructor,
    component: instructorDashboard,
    meta: {
      allowAnonymous: false
    }
  }
  
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(!RegExp('^/admin').test(to.path) && localStorage.getItem('userType') == 'admin')
  {
    next({
      path: '/admin',
    });
  }
  if (
    /^\/admin/.test(to.path) &&
    (!localStorage.getItem('userToken') ||
      localStorage.getItem('userType') != 'admin')
  ) {
    next({
      path: '/login',
    });
  }
  if (to.name == "Login" && (localStorage.getItem('userToken'))) {
    next({
      path: "/courses"
    });
  } else if (to.name == "SignUp" && (localStorage.getItem('userToken'))) {
    next({
      path: "/courses"
    });
  } else if (!to.meta.allowAnonymous && !(localStorage.getItem('userToken'))) {
    next({
      path: "/",
    });
  }else {
    next();
  }
});

export default router
