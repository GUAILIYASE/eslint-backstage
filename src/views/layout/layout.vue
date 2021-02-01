<template>
  <div>
    <el-container>
      <el-header class=" d-f an-c p-f w-max bgc-w" style="zIndex:99">
        <weather class=" w-max"></weather>
      </el-header>
      <el-container>
        <el-aside width="200px" class="p-f lt0 tp60">
          <navmenu :menu="menu" />
        </el-aside>
        <el-main class="boder">
          <div class="contant">
            <navTop class="mb20 z1"></navTop>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let userModel = createNamespacedHelpers("user");
let informationModel = createNamespacedHelpers("information");
let rightModel = createNamespacedHelpers("right");
let { mapState: userState, mapActions: userActions } = userModel;
let { mapActions: informationActions } = informationModel;
let { mapActions: rightActions } = rightModel;
import navmenu from "../../components/menu/menu";
import weather from "../../components/weather/weather";
import navTop from "../../components/navtop/navtop";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    navmenu,
    weather,
    navTop
  },
  methods: {
    ...userActions(["getmenu", "getUsers"]),
    ...informationActions(["getReports"]),
    ...rightActions(["getRole", "allRights", "getLogistics"])
  },
  mounted() {
    this.getmenu();
    this.getRole();
    this.allRights();
    this.getReports();
    this.getUsers({ pagenum: 1, pagesize: 5 });
  },
  computed: {
    ...userState(["menu"])
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.contant {
  position: absolute;
  left: 200px;
  top: 60px;
  right: 1px;
  width: calc(100% - 240px);
  border: rgb(192, 191, 191) 1px solid;
  padding: 10px;
  height: calc(100% - 92px);
}
</style>
