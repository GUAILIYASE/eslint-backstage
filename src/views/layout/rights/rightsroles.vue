<template>
  <div>
    <el-card>
      <div>
        <el-button type="primary" @click="add = true">添加用户</el-button>
      </div>
      <el-table :data="role" style="width: 100%">
        <el-table-column type="expand" width="100">
          <template slot-scope="props">
            <div v-if="props.row.children.length">
              <div
                v-for="(item, index) in props.row.children"
                :key="item.id"
                class=""
              >
                <div class="d-f bt  an-c">
                  <div class="mr30 w-20">
                    <div class=" tag cb">
                      {{ item.authName }}
                      <span
                        class="del"
                        @click="
                          delect(props.row.id, item.id, props.$index, index)
                        "
                        ><i class="el-icon-close"></i
                      ></span>
                    </div>
                  </div>
                  <div class="w-80 pdt10 pdb10 d-fc j-c">
                    <div
                      v-for="(itema, indexa) in item.children"
                      :key="itema.id"
                      class="d-f pdt10 pdb10 an-c bt"
                    >
                      <div class="mr30 w-30 ">
                        <div class="tag cg ">
                          {{ itema.authName }}
                          <span
                            class="del"
                            @click="
                              delect(
                                props.row.id,
                                itema.id,
                                props.$index,
                                index,
                                indexa
                              )
                            "
                            ><i class="el-icon-close"></i
                          ></span>
                        </div>
                      </div>
                      <div class="d-f warp w-70 an-c">
                        <div
                          v-for="(itemb, indexb) in itema.children"
                          :key="itemb.id"
                          class="d-f an-c"
                        >
                          <div class="mr30">
                            <div class="tag co  mt10">
                              {{ itemb.authName }}
                              <span
                                class="del"
                                @click="
                                  delect(
                                    props.row.id,
                                    itemb.id,
                                    props.$index,
                                    index,
                                    indexa,
                                    indexb
                                  )
                                "
                                ><i class="el-icon-close"></i
                              ></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              暂无数据
            </div>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index" width="200"> </el-table-column>
        <el-table-column label="职位" prop="roleName" width="300">
        </el-table-column>
        <el-table-column label="描述" prop="roleDesc" width="300">
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
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="分配权限" placement="top">
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="handleDistribute(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加角色" :visible="add" width="30%" :showClose="false">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div class="p-r lt200">
        <el-button @click="add = false">取消</el-button>
        <el-button type="primary" @click="addUser">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑角色" :visible="edit" width="30%" :showClose="false">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div class="p-r lt200">
        <el-button
          @click="
            edit = false;
            ruleForm.roleName = '';
          "
          >取消</el-button
        >
        <el-button type="primary" @click="editrole">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配权限" :visible="right" width="30%" :showClose="false">
      <el-tree
        :props="defaultProps"
        :data="allRightsTree"
        show-checkbox
        node-key="id"
        :expand-on-click-node="false"
        :default-checked-keys="defaultcheck"
        :default-expanded-keys="defaultopen"
        ref="tree"
      >
        <span class="custom-tree-node" slot-scope="{ node }">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
      <div class="p-r lt200">
        <el-button
          @click="
            right = false;
            $refs.tree.setCheckedKeys([]);
          "
          >取消</el-button
        >
        <el-button type="primary" @click="addUserRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let rightModel = createNamespacedHelpers("right");
let { mapActions: rightActions, mapState: rightState } = rightModel;
export default {
  name: "",
  props: {},
  data() {
    return {
      dialogVisible: false,
      defaultcheck: [],
      defaultopen: [],
      roleId: "",
      add: false,
      right: false,
      edit: false,
      ruleForm: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  components: {},
  methods: {
    ...rightActions([
      "addRole",
      "deleteRole",
      "deleteRights",
      "setRoles",
      "updateRole"
    ]),
    delect(id, did, ri, i, ia, ib) {
      let delobj = {
        roleId: id,
        rightId: did,
        ri: ri,
        i: i,
        ia: ia,
        ib: ib
      };
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRights(delobj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDistribute(data) {
      this.right = true;
      let arr = [];
      let arr1 = [];
      this.roleId = data.id;
      data.children.map(item => {
        item.children.map(i => {
          arr1.push(i.id);
          i.children.map(ichild => {
            arr.push(ichild.id);
          });
        });
      });
      this.defaultcheck = arr;
      this.defaultopen = arr1;
    },
    addUser() {
      this.$refs.ruleForm.validate(v => {
        this.add = false;
        if (v) this.addRole(this.ruleForm);
        this.$refs.ruleForm.resetFields();
      });
    },
    handleDelete(index, data) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$set(data, "index", index);
          this.deleteRole(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addUserRole() {
      let roles = this.$refs.tree.getCheckedKeys();
      roles = JSON.stringify(roles);
      roles = roles.slice(1, roles.length - 1);
      this.setRoles({
        roleId: this.roleId,
        rids: roles
      });
      this.right = false;
    },
    handleEdit(row, index) {
      this.edit = true;
      this.$set(this.ruleForm, "index", index);
      this.$set(this.ruleForm, "id", row.id);
      this.ruleForm.roleName = row.roleName;
    },
    editrole() {
      this.$refs.ruleForm.validate(v => {
        if (v) this.updateRole(this.ruleForm);
      });
      this.edit = false;
    }
  },
  mounted() {},
  computed: {
    ...rightState(["role", "allRightsTree"])
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.bt {
  border-top: 1px solid #eee;
}
.bb {
  border-bottom: 1px solid #eee;
}
.tag {
  display: inline-block;
  height: 32px;
  padding: 0 5px 0 10px;
  line-height: 30px;
  font-size: 12px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  .del {
    display: inline-block;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
  }
  .del:hover {
    color: white;
  }
}
.cb {
  color: #409eff;
  background-color: #ecf5ff;
  border-color: #d9ecff;
  .del {
    color: #1e8dfc;
  }
  .del:hover {
    background-color: #1e8dfc;
  }
}
.cg {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
  .del {
    color: #50c218;
  }
  .del:hover {
    background-color: #50c218;
  }
}
.co {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
  .del {
    color: #e09018;
  }
  .del:hover {
    background-color: #e6a23c;
  }
}
</style>
