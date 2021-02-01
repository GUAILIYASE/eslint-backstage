import api from "../../http/api";
// import { Message } from "element-ui";

export default {
  namespaced: true,
  state: {
    reports: []
  },
  mutations: {
    updateReports(state, data) {
      state.reports = data;
    }
  },
  actions: {
    async getReports({ commit }, params) {
      let res = await api.getReports(params);
      if (res.meta.status === 200) {
        commit("updateReports", res.data);
      }
    }
  },
  modules: {}
};
