<template>
  <div>
    <el-card>
      <div class="d-f an-c w-80 color j-c m-a pdt5 pdb5">
        <i class="el-alert__icon el-icon-info"></i>
        <div class="el-alert__content">
          <span class="el-alert__title">添加商品信息</span>
        </div>
      </div>
      <div style="height: 80px;width:90%" class="m-a mt30">
        <el-steps :active="active / 1" finish-status="success">
          <el-step
            :title="item.label"
            v-for="(item, index) in process"
            :key="index"
            @tab-click="changePage"
          />
          <el-step title="完成" />
        </el-steps>
      </div>
      <div class="d-f w-95">
        <div class="w-20">
          <el-tabs tab-position="left" style="height: 200px;" v-model="active">
            <el-tab-pane
              :label="item.label"
              v-for="(item, index) in process"
              :key="index"
              :name="index + ''"
              :disabled="!item.disabled"
            />
          </el-tabs>
        </div>
        <div class="p-r w-max h800">
          <div class="w-80 p-a bgc-w h-max" :class="{ z1: active === '0' }">
            <el-form
              label-width="80px"
              :model="shopForm"
              ref="shopForm"
              :rules="rules"
            >
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="shopForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input
                  v-model="shopForm.goods_price"
                  :disabled="!shopForm.goods_name"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input
                  v-model="shopForm.goods_weight"
                  :disabled="wt1"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input
                  v-model="shopForm.goods_number"
                  :disabled="wt2"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-cascader
                  v-model="shopForm.goods_cat"
                  :options="allcategory"
                  :props="SetKesDept"
                  :disabled="wt3"
                  ref="selcet"
                ></el-cascader>
              </el-form-item>
            </el-form>
            <el-button v-if="wt" type="success" @click="goOne"
              >下一步</el-button
            >
          </div>
          <div class="w-80 p-a bgc-w h-max" :class="{ z1: active === '1' }">
            <div v-for="(item, index) in shopAttrs.many" :key="index">
              <div class="mb20">{{ item.attr_name }}</div>
              <div class="d-f warp">
                <el-tag
                  v-for="(im, ix) in item.attr_vals"
                  :key="ix"
                  class="mr30 mb10"
                  >{{ im }}</el-tag
                >
              </div>
            </div>
            <el-button v-if="wt" type="success" @click="goTwo"
              >下一步</el-button
            >
          </div>
          <div class="w-80 p-a bgc-w h-max" :class="{ z1: active === '2' }">
            <div v-for="(item, index) in shopAttrs.only" :key="index">
              <div class="mb20">{{ item.attr_name }}</div>
              <div class="d-f warp">
                <el-tag
                  v-for="(im, ix) in item.attr_vals"
                  :key="ix"
                  class="mr30 mb10"
                  >{{ im }}</el-tag
                >
              </div>
            </div>
            <el-button v-if="wt" type="success" @click="goThree"
              >下一步</el-button
            >
          </div>
          <div class="w-80 p-a bgc-w h-max" :class="{ z1: active === '3' }">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :on-success="geturl"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <el-button v-if="wt" type="success" @click="goFour"
              >下一步</el-button
            >
          </div>
          <div class="w-80 p-a bgc-w h-max" :class="{ z1: active === '4' }">
            <mavon-editor
              v-model="shopForm.goods_introduce"
              :toolbars="toolbars"
              v-if="active === '4'"
            ></mavon-editor>
            <el-button v-if="wt" type="success" @click="submit"
              >下一步</el-button
            >
          </div>
        </div>
      </div>
    </el-card>
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
      process: [
        {
          label: "基本信息",
          disabled: true
        },
        {
          label: "商品参数",
          disabled: false
        },
        {
          label: "商品属性",
          disabled: false
        },
        {
          label: "商品图片",
          disabled: false
        },
        {
          label: "商品内容",
          disabled: false
        }
      ],
      active: "0",
      shopForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: "",
        goods_introduce: ""
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
      },
      SetKesDept: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id"
      },
      value: "",
      text: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  components: {},
  methods: {
    ...goodsActions(["getCategory", "getShopAttrs", "upload", "addGoods"]),
    changePage(num) {
      console.log(num);
      this.active = num + 1;
    },
    getValidate() {
      let wieight = this.shopForm.goods_weight;
      let num = this.shopForm.goods_number;
      let price = this.shopForm.goods_price;
      let name = this.shopForm.goods_name;
      return [wieight, num, price, name];
    },
    goOne() {
      this.$refs.shopForm.validate(v => {
        if (v) {
          let data = this.$refs.selcet.getCheckedNodes()[0].data;
          this.getShopAttrs({ id: data.cat_id, sel: "many" });
          this.active = "1";
          this.process[1].disabled = true;
        }
      });
    },
    goTwo() {
      this.$refs.shopForm.validate(v => {
        if (v) {
          let data = this.$refs.selcet.getCheckedNodes()[0].data;
          this.getShopAttrs({ id: data.cat_id, sel: "only" });
          this.active = "2";
          this.process[2].disabled = true;
        }
      });
    },
    goThree() {
      this.$refs.shopForm.validate(v => {
        if (v) {
          this.active = "3";
          this.process[3].disabled = true;
        }
      });
    },
    goFour() {
      this.$refs.shopForm.validate(v => {
        if (v) {
          this.active = "4";
          this.process[4].disabled = true;
        }
      });
    },
    geturl(response, file, fileList) {
      console.log(response, file, fileList);
      this.upload(file.raw);
    },
    submit() {
      let str = JSON.stringify(this.shopForm.goods_cat);
      str = str.slice(1, str.length - 1);
      this.shopForm.goods_cat = str;
      this.addGoods(this.shopForm);
    }
  },
  mounted() {
    this.getCategory({ type: 3 });
  },
  computed: {
    ...goodsState(["allcategory", "shopAttrs"]),
    wt1() {
      let arr = this.getValidate();
      if (arr[3] && arr[2]) {
        return false;
      } else {
        return true;
      }
    },
    wt2() {
      let arr = this.getValidate();
      if (arr[3] && arr[2] && arr[0]) {
        return false;
      } else {
        return true;
      }
    },
    wt3() {
      let arr = this.getValidate();
      if (arr[3] && arr[2] && arr[0] && arr[1]) {
        return false;
      } else {
        return true;
      }
    },
    wt() {
      let arr = this.getValidate();
      if (arr[3] && arr[2] && arr[0] && arr[1] && this.shopForm.goods_cat) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.color {
  background-color: #f4f4f5;
  color: #909399;
}
</style>
