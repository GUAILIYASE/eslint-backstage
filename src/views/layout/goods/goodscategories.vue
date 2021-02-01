<template>
  <div>
    <el-card>
      <div class="mb30">
        <el-button type="primary" @click="getAll">添加分类</el-button>
      </div>
      <tree-table
        :data="category.result"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="序号"
        border
      >
        <!-- 等级模板 -->
        <template slot="levelss" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level == '0'">一级</el-tag>
          <el-tag v-if="scope.row.cat_level == '1'" type="success">二级</el-tag>
          <el-tag v-if="scope.row.cat_level == '2'" type="warning">三级</el-tag>
        </template>
        <template slot="isOk">
          <i class="el-icon-success icon"></i>
        </template>
        <template slot="operate" slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            >编辑
          </el-button>

          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </tree-table>
      <div class="mt30">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5, 15, 20, 30]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="category.total"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="编辑分类"
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
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div class="p-r lt250 mt30">
        <el-button @click="editshop = false">取消</el-button>
        <el-button type="primary" @click="editcategory">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加分类"
      :visible="addshop"
      width="30%"
      :showClose="false"
      v-if="allcategory"
    >
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name" @blur="getAll"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="value"
            :options="allcategory"
            @change="handleChange"
            :props="SetKesDept"
            :disabled="!addForm.cat_name"
            ref="select"
            clearable
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <div class="p-r lt250 mt30">
        <el-button @click="cancal">取消</el-button>
        <el-button type="primary" @click="categoryAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let goodsModel = createNamespacedHelpers("goods");
let { mapState: goodsState, mapActions: goodsActions } = goodsModel;
export default {
  name: "",
  props: {},
  data() {
    return {
      type: 3,
      value: "",
      pagenum: 1,
      pagesize: 5,
      editshop: false,
      addshop: false,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          type: "template",
          template: "isOk",
          align: "center",
          headerAlign: "center",
          width: 200
        },
        {
          label: "排序",
          type: "template",
          template: "levelss",
          align: "center",
          headerAlign: "center",
          width: 200
        },
        {
          label: "操作",
          type: "template",
          template: "operate",
          headerAlign: "center",
          align: "center"
        }
      ],
      editForm: {
        id: "",
        cat_name: ""
      },
      addForm: {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0
      },
      rules: {
        cat_name: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      SetKesDept: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        checkStrictly: true
      }
    };
  },
  components: {},
  methods: {
    ...goodsActions([
      "getCategory",
      "updateCategory",
      "deleteCategory",
      "addCategories"
    ]),
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getlist();
    },
    getlist() {
      this.getCategory({
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    handleEdit(row) {
      this.editshop = true;
      this.editForm.id = row.cat_id;
      this.editForm.cat_name = row.cat_name;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteCategory({
            type: this.type,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            id: row.cat_id
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editcategory() {
      this.$refs.editForm.validate(v => {
        this.editshop = false;
        if (v) this.updateCategory(this.editForm);
      });
    },
    handleChange() {
      let data = this.$refs.select.getCheckedNodes()[0].data;
      console.log(data);
      this.addForm.cat_pid = data.cat_id;
      this.addForm.cat_level = data.cat_level + 1;
    },
    getAll() {
      this.getCategory({ type: 2 });
      this.addshop = true;
    },
    categoryAdd() {
      this.$refs.addForm.validate(v => {
        if (v) {
          this.addshop = false;
          this.$set(this.addForm, "select", {
            type: 3,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          });
          this.addCategories(this.addForm);
        }
        this.addshop = false;
        this.addForm.cat_pid = 0;
        this.addForm.cat_level = 0;
        this.addForm.cat_name = "";
      });
    },
    cancal() {
      this.$refs.addForm.resetFields();
      this.addshop = false;
    }
  },
  mounted() {
    this.getlist();
  },
  computed: {
    ...goodsState(["category", "allcategory"])
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.icon {
  color: skyblue;
}
</style>
