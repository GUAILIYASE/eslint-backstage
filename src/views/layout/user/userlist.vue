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
            @click="search()"
          ></el-button>
        </el-input>
        <el-button type="primary" @click="addusers = true">添加用户</el-button>
      </div>
      <div>
        <el-table :data="userlist.users" style="width: 900%" stripe>
          <el-table-column label="#" width="100" type="index">
          </el-table-column>
          <el-table-column label="姓名" width="180" prop="username">
          </el-table-column>
          <el-table-column label="角色" width="180" prop="role_name">
          </el-table-column>
          <el-table-column label="电话" width="180" prop="mobile">
          </el-table-column>
          <el-table-column label="邮箱" width="180" prop="email">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeState(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.row)"
                >
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="分配角色" placement="top">
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-setting"
                  @click="handleDistribute(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 15, 20, 30]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userlist.total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="编辑用户"
      :visible="dialogVisible"
      width="30%"
      :showClose="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div class="p-r lt200">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUser">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="分配用户"
      :visible="distribute"
      width="30%"
      :showClose="false"
    >
      <div class="mb30">当前用户:{{ userForm.username }}</div>
      <div class="mb30">当前角色:{{ userForm.role_name }}</div>
      <el-select v-model="selectvalue" placeholder="请选择" clearable>
        <el-option
          :label="item.label"
          :value="item.roleName"
          v-for="item in role"
          :key="item.id"
        >
        </el-option>
      </el-select>
      <div class="p-r lt250 mt30">
        <el-button @click="distribute = false">取消</el-button>
        <el-button type="primary" @click="distributeUser">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加用户"
      :visible="addusers"
      width="30%"
      :showClose="false"
    >
      <el-form
        :model="userForm"
        :rules="userRules"
        ref="userForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="userForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div class="p-r lt200">
        <el-button @click="addusers = false">取消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import cloneDeep from "lodash/cloneDeep";
let userModel = createNamespacedHelpers("user");
let rightModel = createNamespacedHelpers("right");
let { mapState: userState, mapActions: userActions } = userModel;
let { mapState: rightState } = rightModel;
export default {
  name: "",
  props: {},
  data() {
    return {
      value: "",
      selectvalue: "",
      currentPage: 1,
      currentPageSize: 5,
      dialogVisible: false,
      addusers: false,
      distribute: false,
      form: {},
      userForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      ruleForm: {
        username: "",
        email: "",
        mobile: ""
      },
      rules: {
        email: [{ required: true, message: "不能为空", trigger: "change" }],
        mobile: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      userRules: {
        username: [{ required: true, message: "不能为空", trigger: "change" }],
        password: [{ required: true, message: "不能为空", trigger: "change" }],
        email: [{ required: true, message: "不能为空", trigger: "change" }],
        mobile: [{ required: true, message: "不能为空", trigger: "change" }]
      }
    };
  },
  components: {},
  methods: {
    ...userActions([
      "getUsers",
      "updateUserState",
      "updateUser",
      "deleteUser",
      "addUser",
      "setUserRole"
    ]),
    handleEdit(row) {
      this.dialogVisible = true;
      this.ruleForm = cloneDeep(row);
      this.form = row;
    },
    handleSizeChange(val) {
      console.log(val, this.currentPage);
      this.currentPageSize = val;
      this.getUsers({
        pagenum: this.currentPage,
        pagesize: val,
        query: this.value
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUsers({
        pagenum: val,
        pagesize: this.currentPageSize,
        query: this.value
      });
    },
    changeState(data) {
      this.updateUserState({
        uId: data.id,
        type: data.mg_state
      });
    },
    editUser() {
      this.$refs.ruleForm.validate(v => {
        if (v) {
          this.updateUser({
            uId: this.ruleForm.id,
            mobile: this.ruleForm.mobile,
            email: this.ruleForm.email
          });
          this.form.mobile = this.ruleForm.mobile;
          this.form.email = this.ruleForm.email;
        }
        this.dialogVisible = false;
      });
    },
    add() {
      this.$refs.userForm.validate(v => {
        this.addusers = false;
        if (v) {
          this.$set(this.userForm, "currentsize", this.currentPageSize);
          this.addUser(this.userForm);
        }
      });
      this.$refs.userForm.resetFields();
    },
    handleDelete(index, data) {
      console.log(index, data);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$set(data, "search", {
            pagenum: this.currentPage,
            pagesize: this.currentPageSize,
            query: this.value
          });
          this.deleteUser(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDistribute(index, data) {
      this.distribute = true;
      console.log(index, data);
      this.$set(data, "UIndex", index);
      this.userForm = data;
    },
    distributeUser() {
      this.distribute = false;
      let arr = this.role.filter(item => {
        return item.roleName === this.selectvalue;
      });
      this.setUserRole({
        id: this.userForm.id,
        rid: arr[0].id,
        UIndex: this.userForm.UIndex,
        role: this.selectvalue
      });
    },
    search() {
      this.getUsers({
        pagenum: this.currentPage,
        pagesize: this.currentPageSize,
        query: this.value
      });
    }
  },
  mounted() {},
  computed: {
    ...userState(["userlist"]),
    ...rightState(["role"])
  },
  watch: {}
};
</script>

<style lang="scss" scoped></style>
