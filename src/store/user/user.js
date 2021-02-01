import api from "../../http/api";
import { Message } from "element-ui";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    menu: [],
    userlist: {}
  },
  mutations: {
    updateMenu(state, data) {
      state.menu = data;
    },
    updateRole(state, data) {
      state.role = data;
      console.log(data);
    },
    updateUserlist(state, data) {
      state.userlist = data;
    },
    delectUserlist(state, index) {
      state.userlist.users.splice(index, 1);
      state.userlist.total--;
    },
    addUserlist(state, data) {
      if (state.userlist.users.length < data.size) {
        state.userlist.users.push(data.data);
      }
      state.userlist.total++;
    },
    updatedUserRole(state, data) {
      console.log(data);
      state.userlist.users[data.UIndex].role_name = data.role;
    }
  },
  actions: {
    async login(_, params) {
      let res = await api.login(params);
      console.log(res);
      if (res.meta.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);
        Message.success(res.meta.msg);
        router.push("/");
      } else {
        Message.error(res.meta.msg);
      }
    },
    async getmenu({ commit }, params) {
      let res = await api.getMenus(params);
      if (res.meta.status === 200) {
        commit("updateMenu", res.data);
      }
    },

    async getUsers({ commit }, params) {
      let res = await api.getUsers(params);
      if (res.meta.status === 200) {
        commit("updateUserlist", res.data);
      }
    },
    async updateUserState(_, params) {
      let res = await api.updateUserState(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
      } else {
        Message.error(res.meta.msg);
      }
    },
    async updateUser(_, params) {
      let res = await api.updateUser(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
      } else {
        Message.error(res.meta.msg);
      }
    },
    async addUser({ commit }, params) {
      let res = await api.addUser(params);
      console.log(params);
      if (res.meta.status === 201) {
        Message.success(res.meta.msg);
        commit("addUserlist", { data: res.data, size: params.currentsize });
      } else {
        Message.error(res.meta.msg);
      }
    },
    async deleteUser({ dispatch }, params) {
      let res = await api.deleteUser(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        dispatch("getUsers", params.search);
      } else {
        Message.error(res.meta.msg);
      }
    },
    async setUserRole({ commit }, params) {
      let res = await api.setUserRole(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
        commit("updatedUserRole", params);
      } else {
        Message.error(res.meta.msg);
      }
    }
  },
  modules: {}
};
