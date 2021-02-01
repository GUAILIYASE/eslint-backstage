import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import setnav from "./utils/util";
import "default-passive-events";
import TreesTable from "vue-table-with-tree-grid";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.component("tree-table", TreesTable);
Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.config.productionTip = false;

Vue.prototype.$setnav = setnav;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
