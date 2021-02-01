import api from "../../http/api";
import { Message } from "element-ui";
import vue from "vue";

export default {
  namespaced: true,
  state: {
    role: [],
    allRightsTree: [],
    allRightsList: []
  },
  mutations: {
    addRole(state, data) {
      console.log(data);
      vue.set(data, "id", data.roleId);
      vue.set(data, "children", []);
      state.role.push(data);
    },
    deleteRole(state, index) {
      state.role.splice(index, 1);
    },
    deleteRights(state, data) {
      if (data.ib >= 0) {
        state.role[data.ri].children[data.i].children[data.ia].children.splice(
          data.ib,
          1
        );
      } else if (data.ia >= 0) {
        state.role[data.ri].children[data.i].children.splice(data.ia, 1);
      } else if (data.i >= 0) {
        state.role[data.ri].children.splice(data.i, 1);
      }
    },
    updateRole(state, data) {
      state.role = data;
    },
    updateallRightsTree(state, data) {
      state.allRightsTree = data;
    },
    updateallRightsList(state, data) {
      state.allRightsList = data;
    },
    editRole(state, data) {
      state.role[data.index].roleName = data.data.roleName;
      state.role[data.index].roleDesc = data.data.roleDesc;
    }
  },
  actions: {
    async addRole({ commit }, params) {
      let res = await api.addRole(params);
      if (res.meta.status === 201) {
        Message.success(res.meta.msg);
        commit("addRole", res.data);
      }
    },
    async getRole({ commit }, params) {
      let res = await api.getRole(params);
      if (res.meta.status === 200) {
        commit("updateRole", res.data);
      }
    },
    async updateRole({ commit }, params) {
      let res = await api.updateRole(params);
      console.log(res, params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        commit("editRole", {
          data: res.data,
          index: params.index
        });
      }
    },
    async allRights({ commit }) {
      let res = await api.allRights({ type: "tree" });
      let res1 = await api.allRights({ type: "list" });
      if (res.meta.status === 200) {
        commit("updateallRightsTree", res.data);
      }
      if (res1.meta.status === 200) {
        commit("updateallRightsList", res1.data);
      }
    },
    async deleteRole({ commit }, params) {
      let res = await api.deleteRole(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        commit("deleteRole", params.index);
      }
    },
    async deleteRights({ commit }, params) {
      let res = await api.deleteRights(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        commit("deleteRights", params);
      }
    },
    async setRoles({ dispatch }, params) {
      let res = await api.setRoles(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        // let res1 = await api.getRole(params);
        dispatch("getRole");
      }
    }
  },
  modules: {}
};
