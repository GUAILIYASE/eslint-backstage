<template>
  <div>
    <el-card>
      <div class="d-f an-c w-80 color   pdt10 pdb10 pdl10">
        <i class="el-alert__icon el-icon-info"></i>
        <div class="el-alert__content">
          <span class="el-alert__title"
            >注意:只允许为第三级分类设置相关参数!</span
          >
        </div>
      </div>
      <div class="d-f mt30 an-c ">
        <h2 class="mr30">选择商品分类:</h2>
        <el-cascader
          :options="allcategory"
          @change="handleChange"
          :props="SetKesDept"
          ref="select"
        >
        </el-cascader>
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="first"></el-tab-pane>
          <el-tab-pane label="静态属性" name="second"></el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-button type="primary" :disabled="!fatherid" @click="add = true"
          >添加参数</el-button
        >
        <el-table :data="attrs" style="width: 100%">
          <el-table-column type="index" label="#" width="50" />
          <el-table-column type="expand" width="100">
            <template slot-scope="props">
              <div class="d-f">
                <el-tag
                  closable
                  class="mr20"
                  v-for="(item, index) in props.row.attr_vals"
                  :key="index"
                  @close="handleClose(index, props.$index)"
                  >{{ item }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  style="width:300px"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(props.$index, props.row)"
                  >+ New Tag</el-button
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="参数名称"
            width="480"
            align="center"
          />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.row, scope.$index)"
              >
                编辑
              </el-button>

              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row, scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog
      :title="'修改' + title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        label-width="80px"
      >
        <el-form-item prop="attr_name" :label="title">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div class="d-f j-c">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeTag">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="'添加' + title"
      :visible="add"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
        <el-form-item prop="attr_name" label="动态参数">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div class="d-f j-c">
        <el-button @click="add = false">取 消</el-button>
        <el-button type="primary" @click="addParam">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import strUtil from "../../../utils/str";
import { createNamespacedHelpers } from "vuex";
let goodsModel = createNamespacedHelpers("goods");
let { mapState: goodsState, mapActions: goodsActions } = goodsModel;
export default {
  name: "",
  props: {},
  data() {
    return {
      SetKesDept: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id"
      },
      activeName: "first",
      fatherid: "",
      inputVisible: false,
      inputValue: "",
      editindex: {},
      dialogVisible: false,
      add: false,
      editForm: {
        attr_name: "",
        id: "",
        index: "",
        attrId: ""
      },
      addForm: {
        attr_name: "",
        id: "",
        index: ""
      },
      rules: {
        attr_name: [{ required: true, message: "不能为空", trigger: "change" }]
      }
    };
  },
  components: {},
  methods: {
    ...goodsActions([
      "getCategory",
      "getAttrs",
      "editAttrs",
      "deleteAttr",
      "addAttrs",
      "clearAttrs"
    ]),
    handleChange() {
      this.fatherid = this.$refs.select.getCheckedNodes()[0].data.cat_id;
      this.getATT();
    },
    getATT() {
      if (this.fatherid) this.getAttrs({ id: this.fatherid, sel: this.sel });
    },
    handleClick() {
      this.getATT();
    },
    showInput(val, row) {
      this.inputVisible = true;
      this.editindex = {
        index: val,
        id: row.cat_id,
        aid: row.attr_id,
        attr_name: row.attr_name
      };
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      let arr = this.attrs;
      let index = this.editindex.index;
      if (inputValue) {
        arr[index].attr_vals.push(inputValue);
      }
      let str = strUtil.toStr(arr[index].attr_vals);
      this.editTag(str);
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleClose(sindex, index) {
      this.attrs[index].attr_vals.splice(sindex, 1);
      let str = strUtil.toStr(this.attrs[index].attr_vals);
      this.editTag(str);
    },
    editTag(str) {
      this.editAttrs({
        id: this.editindex.id,
        attr_name: this.editindex.attr_name,
        attr_sel: this.sel,
        attr_vals: str,
        attrId: this.editindex.aid
      });
    },
    handleEdit(row, index) {
      this.editForm.attr_name = row.attr_name;
      this.editForm.id = row.cat_id;
      this.editForm.attrId = row.attr_id;
      this.editForm.index = index;
      this.dialogVisible = true;
    },
    changeTag() {
      this.$refs.editForm.validate(v => {
        if (v)
          this.editAttrs({
            id: this.editForm.id,
            attr_name: this.editForm.attr_name,
            attr_sel: this.sel,
            attrId: this.editForm.attrId,
            index: this.editForm.index
          });
        this.dialogVisible = false;
        this.$refs.editForm.resetFields();
      });
    },
    handleDelete(row, index) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteAttr({
            id: row.cat_id,
            attrid: row.attr_id,
            index: index
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addParam() {
      this.$refs.addForm.validate(v => {
        if (v) {
          this.addAttrs({
            id: this.fatherid,
            attr_name: this.addForm.attr_name,
            attr_sel: this.sel
          });
          this.add = false;
          this.$refs.addForm.resetFields();
        }
      });
    }
  },
  mounted() {
    this.getCategory({ type: 3 });
    this.clearAttrs();
  },
  computed: {
    ...goodsState(["attrs", "allcategory"]),
    sel() {
      let sel = this.activeName !== "first" ? "only" : "many";
      return sel;
    },
    title() {
      let title = this.activeName === "first" ? "动态参数" : "静态属性";
      return title;
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.color {
  background-color: #fdf6ec;
  color: #e6a23c;
}
</style>
