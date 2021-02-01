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
            @click="getALL"
          ></el-button>
        </el-input>
        <el-button type="primary" @click="$router.push('addGoods')"
          >添加商品</el-button
        >
      </div>
      <el-table :data="goods.goods" style="width: 900%" stripe border="">
        <el-table-column label="#" width="100" type="index"> </el-table-column>
        <el-table-column label="商品名称" width="550" prop="goods_name">
        </el-table-column>
        <el-table-column label="商品价格（元）" width="150" prop="goods_price">
        </el-table-column>
        <el-table-column label="商品重量" width="100" prop="goods_weight">
        </el-table-column>
        <el-table-column label="创建时间" width="180" prop="add_time">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.row, scope.$index)"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="goods.total"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="编辑商品"
      :visible="editshop"
      width="30%"
      :showClose="false"
    >
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="editForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="editForm.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="editForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <div class="p-r lt250 mt30">
        <el-button @click="editshop = false">取消</el-button>
        <el-button type="primary" @click="editShop">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let goodsModel = createNamespacedHelpers("goods");
let { mapState: goodsState, mapActions: goodsActions } = goodsModel;
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "",
  props: {},
  data() {
    return {
      value: "",
      currentpage: 1,
      currentpagesize: 10,
      editshop: false,
      editForm: {
        id: "",
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: ""
      },
      rules: {
        goods_name: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        goods_price: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        goods_number: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        goods_weight: [
          { required: true, message: "不能为空", trigger: "change" }
        ]
      }
    };
  },
  components: {},
  methods: {
    ...goodsActions(["getGoods", "deleteGood"]),
    getALL() {
      this.getGoods({
        pagenum: this.currentpage,
        pagesize: this.currentpagesize,
        query: this.value
      });
    },
    handleSizeChange(val) {
      this.currentpagesize = val;
      this.getALL();
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.getALL();
    },
    handleEdit(row, index) {
      this.editForm = cloneDeep(row);
      this.editForm.id = row.goods_id;
      this.editshop = true;
      this.$set(this.editForm, "index", index);
      console.log(this.editForm);
    },
    editShop() {
      this.$refs.editForm.validate(v => {
        if (v) this.goods.goods[this.editForm.index] = this.editForm;
        this.editshop = false;
        this.$refs.editForm.resetField();
      });
    },
    handleDelete(data) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$set(data, "search", {
            pagenum: this.currentpage,
            pagesize: this.currentpagesize,
            query: this.value
          });
          this.deleteGood(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.getALL();
  },
  computed: {
    ...goodsState(["goods"])
  },
  watch: {}
};
</script>

<style lang="scss" scoped></style>
