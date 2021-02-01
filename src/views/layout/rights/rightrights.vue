<template>
  <div>
    <el-card>
      <el-table :data="allRightsList" style="width: 100%" stripe border>
        <el-table-column type="index" label="#" align="center">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" align="center">
        </el-table-column>
        <el-table-column label="权限等级" align="center">
          <template slot-scope="props">
            <el-tag v-if="props.row.level === '0'">一级权限</el-tag>
            <el-tag type="success" v-if="props.row.level === '1'"
              >二级权限</el-tag
            >
            <el-tag type="warning" v-if="props.row.level === '2'"
              >三级权限</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let rightModel = createNamespacedHelpers("right");
let { mapState: rightState } = rightModel;
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {
    ...rightState(["allRightsList"])
  },
  watch: {}
};
</script>

<style lang="scss" scoped></style>
