import Vue from "vue";
import VueRouter from "vue-router";
import setnav from "../utils/util";
import layout from "../views/layout/layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/layout/Home.vue"),
        meta: {
          title: "首页",
          path: "/"
        }
      }
    ]
  },
  {
    path: "",
    component: layout,
    children: [
      {
        path: "/users",
        component: () => import("../views/layout/user/user.vue"),
        meta: {
          icon: "el-icon-user"
        },
        children: [
          {
            path: "users",
            name: "users",
            component: () => import("../views/layout/user/userlist.vue"),
            meta: {
              title: "用户列表",
              icon: "el-icon-folder-opened",
              path: "/users/users"
            }
          }
        ]
      }
    ]
  },
  {
    path: "",
    component: layout,
    children: [
      {
        path: "/rights",
        component: () => import("../views/layout/rights/rights.vue"),
        meta: {
          icon: "el-icon-folder"
        },
        children: [
          {
            path: "roles",
            name: "roles",
            component: () => import("../views/layout/rights/rightsroles.vue"),
            meta: {
              title: "角色列表",
              icon: "el-icon-setting",
              path: "/rights/roles"
            }
          },
          {
            path: "rights",
            name: "rights",
            component: () => import("../views/layout/rights/rightrights.vue"),
            meta: {
              title: "权限列表",
              path: "/rights/rights",
              icon: "el-icon-c-scale-to-original"
            }
          }
        ]
      }
    ]
  },
  {
    path: "",
    component: layout,
    children: [
      {
        path: "/goods",
        component: () => import("../views/layout/goods/goods.vue"),
        meta: {
          icon: "el-icon-goods"
        },
        children: [
          {
            path: "goods",
            name: "goods",
            component: () => import("../views/layout/goods/goodsgoods.vue"),
            meta: {
              title: "商品列表",
              path: "/goods/goods",
              icon: "el-icon-help"
            }
          },
          {
            path: "params",
            name: "params",
            component: () => import("../views/layout/goods/goodsparams.vue"),
            meta: {
              title: "分类参数",
              path: "/goods/params",
              icon: "el-icon-bell"
            }
          },
          {
            path: "categories",
            name: "categories",
            component: () =>
              import("../views/layout/goods/goodscategories.vue"),
            meta: {
              title: "商品分类",
              path: "/goods/categories",
              icon: "el-icon-date"
            }
          },
          {
            path: "addGoods",
            name: "addGoods",
            component: () => import("../views/layout/goods/addGoods.vue"),
            meta: {
              title: "添加商品",
              path: "/goods/goods"
            }
          }
        ]
      }
    ]
  },
  {
    path: "",
    component: layout,
    children: [
      {
        path: "/orders",
        component: () => import("../views/layout/orders/orders.vue"),
        meta: {
          icon: "el-icon-s-order"
        },
        children: [
          {
            path: "orders",
            name: "orders",
            component: () => import("../views/layout/orders/ordersorders.vue"),
            meta: {
              title: "订单列表",
              path: "/orders/orders",
              icon: "el-icon-folder-add"
            }
          }
        ]
      }
    ]
  },
  {
    path: "",
    component: layout,
    children: [
      {
        path: "/reports",
        component: () => import("../views/layout/reports/reports.vue"),
        meta: {
          icon: "el-icon-message"
        },
        children: [
          {
            path: "reports",
            name: "reports",
            component: () =>
              import("../views/layout/reports/reportsreports.vue"),
            meta: {
              title: "数据报表",
              path: "reports",
              icon: "el-icon-position"
            }
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue"),
    meta: {
      title: "登录"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let user = localStorage.getItem("user");

  if (to.path !== "/login") {
    if (user) {
      setnav(to);
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
  next();
});

export default router;
