<template>
  <div class="d-f">
    <draggable v-model="$store.state.nav" @end="update">
      <div
        v-for="(item, index) in $store.state.nav"
        :key="index"
        @click="backpage(item.path, $route.path)"
        class="moveitem p-r"
        :class="{ openPage: $route.path === item.path }"
        @contextmenu.prevent="closepage(index)"
      >
        <div class="d-f an-c">
          <div class="circle" v-if="$route.path === item.path"></div>
          {{ item.title }}
          <span
            v-if="
              !($store.state.nav.length === 1 && item.path === '/') &&
                $route.path === item.path
            "
            class="ml5"
            @click.stop="delect(index)"
            ><i class="el-icon-close"></i
          ></span>
        </div>
        <div
          v-if="active === index && show"
          class="p-a tp20 colsemenu d-fc j-c"
        >
          <div @click.stop="closeother">关闭其他</div>
          <div @click.stop="close(1)">关闭左侧</div>
          <div @click.stop="close()">关闭右侧</div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "",
  props: {},
  data() {
    return {
      nav: [],
      show: false,
      active: null
    };
  },
  components: {
    draggable
  },
  methods: {
    backpage(pathto, pathfrom) {
      this.show = false;
      if (pathto !== pathfrom) this.$router.push(pathto);
    },
    getnav() {
      this.nav = JSON.parse(localStorage.getItem("nav"));
    },
    update() {
      let arr = this.$store.state.nav;
      localStorage.setItem("nav", JSON.stringify(arr));
    },
    closepage(index) {
      if (!this.show) {
        this.show = true;
      }
      this.active = index;
    },
    delect(index) {
      let arr = this.$store.state.nav;
      arr.splice(index, 1);
      localStorage.setItem("nav", JSON.stringify(arr));
      this.$store.commit("updatanav");
      if (arr.length >= 1 && index >= 1) {
        let path = arr[index - 1].path;
        if (index > 0) this.$router.push(path);
      } else if (arr.length >= 1 && index === 0) {
        let path = arr[index].path;
        this.$router.push(path);
      } else if (arr.length === 0) {
        this.$router.push("/");
      }
    },
    closeother() {
      let arr = this.$store.state.nav;
      let path = this.$route.path;
      arr = arr.filter(item => {
        return item.path === path;
      });
      localStorage.setItem("nav", JSON.stringify(arr));
      this.$store.commit("updatanav");
      this.show = false;
    },
    close(delect) {
      let arr = this.$store.state.nav;
      let path = this.$route.path;
      let index = arr.findIndex(item => {
        return item.path === path;
      });
      if (!delect) {
        if (index === arr.length - 1) this.$message("已经是最右边了");
        arr = arr.slice(0, index + 1);
      } else {
        console.log(index === 0);
        if (index === 0) this.$message("已经是最左边了");
        arr = arr.slice(index, arr.length);
      }
      localStorage.setItem("nav", JSON.stringify(arr));
      this.$store.commit("updatanav");
      this.show = false;
    }
  },
  mounted() {
    this.getnav();
  },
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.openPage {
  background: #409eff;
  color: #fff;
}
.moveitem {
  display: inline-block;
  font-size: 12px;
  padding: 2px 10px;
  margin-right: 5px;
  border: 1px solid #ddd;
}
.circle {
  height: 8px;
  width: 8px;
  background: #fff;
  border-radius: 50%;
  margin-right: 5px;
}
.colsemenu {
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  width: 80px;
  color: #333;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  padding: 5px;
  z-index: 9999;
  cursor: pointer;
  z-index: 99;
  div {
    padding: 5px;
    text-align: center;
  }
}
</style>
