<template>
  <div>
    <el-card>
      <div class="w500 mb30 d-f">
        <el-input
          placeholder="请输入内容"
          v-model="value"
          class="input-with-select mr30"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getlist"
          ></el-button>
        </el-input>
      </div>
      <el-table :data="orders.goods" style="width: 900%" stripe border>
        <el-table-column label="#" width="100" type="index" align="center" />
        <el-table-column
          label="订单编号"
          width="250"
          prop="order_number"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="订单价格"
          width="150"
          prop="order_price"
          align="center"
        >
        </el-table-column>
        <el-table-column label="是否付款" width="180" align="center">
          <template slot-scope="props">
            <el-tag>{{
              props.row.order_pay === "0" ? "未付款" : "已付款"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="是否发货"
          width="100"
          prop="is_send"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="下单时间"
          width="220"
          prop="create_time"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="address = true"
            >
            </el-button>

            <el-button
              size="mini"
              type="success"
              icon="el-icon-location-outline"
              @click="msg = true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5, 15, 20, 30]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="orders.total"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="地址选择"
      :visible="address"
      width="50%"
      close-on-click-modal
      show-close
      @close="address = false"
    >
      <el-cascader
        v-model="cityvalue"
        :options="city"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
        style="width:80%"
      >
        <template slot-scope="{ node, data }">
          <span>{{ data.label }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
      </el-cascader>
    </el-dialog>
    <el-dialog
      title="物流信息"
      :visible="msg"
      width="50%"
      close-on-click-modal
      show-close
      @close="msg = false"
    >
      <div>
        暂无数据
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let orderModel = createNamespacedHelpers("order");
let { mapState: orderState, mapActions: orderActions } = orderModel;
import city from "../../../utils/address";
export default {
  name: "",
  props: {},
  data() {
    return {
      value: "",
      cityvalue: [],
      pagenum: 1,
      pagesize: 5,
      address: false,
      msg: false,
      city: []
    };
  },
  components: {},
  methods: {
    ...orderActions(["getOrders"]),
    getlist() {
      this.getOrders({
        query: this.value,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getlist();
    },
    handleChange() {}
  },
  mounted() {
    this.getlist();
    this.city = city.data;
  },
  computed: {
    ...orderState(["orders"])
  },
  watch: {}
};
</script>

<style lang="scss" scoped></style>
