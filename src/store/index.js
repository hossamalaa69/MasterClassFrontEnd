import Vue from "vue";
import Vuex from "vuex";
import admin from "./modules/admin"
import user from "./modules/user"
import leaner from './modules/learner'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    admin,
    user,
    leaner
  },
});