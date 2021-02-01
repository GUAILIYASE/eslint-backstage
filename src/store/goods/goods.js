import api from "../../http/api";
import { Message } from "element-ui";
import dayjs from "dayjs";
import strUtil from "../../utils/str";
export default {
  namespaced: true,
  state: {
    goods: {},
    category: {},
    allcategory: [],
    attrs: [],
    shopAttrs: {
      only: {},
      many: {}
    }
  },
  mutations: {
    updateGoods(state, data) {
      data.goods.map(item => {
        item.add_time = dayjs(item.add_time * 1000).format(
          "YYYY-MM-DD hh:mm:ss"
        );
      });
      console.log(data);
      state.goods = data;
    },
    updateCategory(state, data) {
      if (data.type) {
        state.category = data.data;
      } else {
        state.allcategory = data.data;
      }
    },
    editCategory(state, data) {
      state.category.result.map(item => {
        if (item.cat_id === data.id) {
          item.cat_name = data.cat_name;
        } else {
          item.children = item.children || [];
          item.children.map(itema => {
            if (itema.cat_id === data.id) {
              itema.cat_name = data.cat_name;
            } else {
              itema.children = itema.children || [];
              itema.children.map(itemb => {
                if (itemb.cat_id === data.id) {
                  itemb.cat_name = data.cat_name;
                }
              });
            }
          });
        }
      });
    },
    updateAttrs(state, data) {
      data.map(item => {
        item.attr_vals = strUtil.toArr(item.attr_vals);
      });
      state.attrs = data;
    },
    updateShopAttrs(state, data) {
      data.map(item => {
        item.attr_vals = strUtil.toArr(item.attr_vals);
      });
      state.shopAttrs[data[0].attr_sel] = data;
    },
    editAttrs(state, data) {
      state.attrs[data.index].attr_name = data.attr_name;
    },
    deleteAttr(state, data) {
      state.attrs.splice(data.index, 1);
    },
    addAttrs(state, data) {
      data.attr_vals = strUtil.toArr(data.attr_vals);
      state.attrs.push(data);
    },
    clearAttrs(state) {
      state.attrs = [];
    }
  },
  actions: {
    async getGoods({ commit }, params) {
      let res = await api.getGoods(params);
      if (res.meta.status === 200) {
        commit("updateGoods", res.data);
      }
    },
    async deleteGood({ dispatch }, params) {
      let res = await api.deleteGood({ id: params.goods_id });
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        dispatch("getGoods", params.search);
      }
    },
    async deleteCategory({ dispatch }, params) {
      let res = await api.deleteCategory(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        dispatch("getCategory", params);
      }
    },
    async updateCategory({ commit }, params) {
      let res = await api.updateCategory(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        commit("editCategory", params);
      }
    },
    async getCategory({ commit }, params) {
      let res = await api.getCategory(params);
      if (res.meta.status === 200) {
        commit("updateCategory", {
          data: res.data,
          type: params.pagenum || ""
        });
      }
    },
    async addCategories({ dispatch }, params) {
      let res = await api.addCategories(params);
      if (res.meta.status === 201) {
        Message.success(res.meta.msg);
        dispatch("getCategory", params.select);
      }
    },
    async getAttrs({ commit }, params) {
      let res = await api.getAttrs(params);
      if (res.meta.status === 200) {
        commit("updateAttrs", res.data);
      }
    },
    async getShopAttrs({ commit }, params) {
      let res = await api.getAttrs(params);
      if (res.meta.status === 200) {
        commit("updateShopAttrs", res.data);
      }
    },
    async editAttrs({ commit }, params) {
      let res = await api.editAttrs(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        if (params.index >= 0) commit("editAttrs", params);
      }
    },
    async deleteAttr({ commit }, params) {
      let res = await api.deleteAttr(params);
      console.log(res);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        if (params.index >= 0) commit("deleteAttr", params);
      }
    },
    async addAttrs({ commit }, params) {
      let res = await api.addAttrs(params);
      console.log(res);
      if (res.meta.status === 201) {
        Message.success(res.meta.msg);
        commit("addAttrs", res.data);
      }
    },
    async upload(_, params) {
      console.log(params);
      let res = await api.upload(params);
      console.log(res, params);
      if (res.meta.status === 201) {
        Message.success(res.meta.msg);
      }
    },
    async addGoods(_, params) {
      console.log(params);
      let res = await api.addGoods(params);
      console.log(res);
      if (res.meta.status === 201) {
        Message.success(res.meta.msg);
      }
    },
    clearAttrs({ commit }) {
      commit("clearAttrs");
    }
  },
  modules: {}
};
