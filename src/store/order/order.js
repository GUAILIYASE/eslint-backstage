import api from "../../http/api";
// import { Message } from "element-ui";
import dayjs from "dayjs";

export default {
  namespaced: true,
  state: {
    orders: {}
  },
  mutations: {
    updateOrders(state, data) {
      data.goods.map(item => {
        item.create_time = dayjs(item.create_time * 1000).format(
          "YYYY-MM-DD hh:mm:ss"
        );
      });
      state.orders = data;
    }
  },
  actions: {
    async getOrders({ commit }, params) {
      let res = await api.getOrders(params);
      if (res.meta.status === 200) {
        commit("updateOrders", res.data);
      }
    }
  },
  modules: {}
};
