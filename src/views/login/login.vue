<template>
  <div class="bgImg p-a w-max h-max">
    <div class="form">
      <el-card>
        <div slot="header" class="tx-c">
          <span>欢迎来到小爱后台系统</span>
        </div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <div class="tx-c">
            特别提醒:
            如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。
          </div>
          <div class="d-f j-c an-c">
            <el-button type="primary" @click="submit" size="medium"
              >登录</el-button
            >
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let userModel = createNamespacedHelpers("user");
let { mapActions: userActions } = userModel;
export default {
  name: "",
  props: {},
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名为必填项", trigger: "blur" },
          { min: 3, message: "长度在至少3位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码为必填项", trigger: "blur" },
          { min: 3, message: "长度在至少3位", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    ...userActions(["login"]),
    submit() {
      this.$refs.ruleForm.validate(v => {
        if (v) this.login(this.ruleForm);
      });
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.bgImg {
  background-image: url("https://preview.pro.antdv.com/assets/background.a568162c.svg");
}
.form {
  margin: 100px auto;
  width: 800px;
}
</style>
