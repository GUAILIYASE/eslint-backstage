import Vue from "vue";
import Vuex from "vuex";
import user from "./user/user";
import information from "./information/information";
import right from "./right/right";
import goods from "./goods/goods";
import order from "./order/order";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nav: []
  },
  mutations: {
    updatanav(state) {
      state.nav = JSON.parse(localStorage.getItem("nav"));
    }
  },
  actions: {},
  modules: {
    user,
    information,
    right,
    goods,
    order
  }
});
