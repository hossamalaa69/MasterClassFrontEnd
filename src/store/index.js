import Vue from "vue";
import Vuex from "vuex";
import admin from "./modules/admin"
import user from "./modules/user"
import leaner from './modules/learner'
import instructor from './modules/instructor'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    admin,
    user,
    leaner,
    instructor
  },
});