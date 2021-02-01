<template>
  <div>
    <el-menu :default-active="$route.meta.path" router unique-opened>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页{{ $route.meta.name }}</span>
      </el-menu-item>
      <el-submenu
        :index="index + ''"
        v-for="(item, index) in menu"
        :key="index"
      >
        <template slot="title">
          <i :class="icon[index].children[0].meta.icon"></i>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item-group v-for="(im, ix) in item.children" :key="ix">
          <el-menu-item :index="'/' + item.path + '/' + im.path">
            <i :class="icon[index].children[0].children[ix].meta.icon"></i>
            <span slot="title"> {{ im.authName }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    menu: {
      type: Array
    }
  },
  data() {
    return {
      icon: []
    };
  },
  components: {},
  methods: {},
  mounted() {
    let arr = this.$router.options.routes;
    if (arr.length === 7) {
      arr = arr.slice(1, arr.length - 1);
      this.icon = arr;
    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped></style>
