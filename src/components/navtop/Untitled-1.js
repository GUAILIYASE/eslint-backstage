// {
  //   path: "",
  //   component: layout,
  //   children: [
  //     {
  //       path: "/",
  //       name: "Home",
  //       component: () => import("../views/layout/Home.vue"),
  //       meta: {
  //         title: "首页"
  //       }
  //     },
  //     {
  //       path: "/users",
  //       component: () => import("../views/layout/user/user.vue"),
  //       meta: {
  //         icon: "el-icon-user"
  //       },
  //       children: [
  //         {
  //           path: "users",
  //           name: "users",
  //           component: () => import("../views/layout/user/userlist.vue"),
  //           meta: {
  //             title: "用户列表",
  //             icon: "el-icon-folder-opened"
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: "/rights",
  //       component: () => import("../views/layout/rights/rights.vue"),
  //       meta: {
  //         icon: "el-icon-folder"
  //       },
  //       children: [
  //         {
  //           path: "roles",
  //           name: "roles",
  //           component: () => import("../views/layout/rights/rightsroles.vue"),
  //           meta: {
  //             title: "角色列表",
  //             icon: "el-icon-setting"
  //           }
  //         },
  //         {
  //           path: "rights",
  //           name: "rights",
  //           component: () => import("../views/layout/rights/rightrights.vue"),
  //           meta: {
  //             title: "权限列表",
  //             icon: "el-icon-c-scale-to-original"
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: "/goods",
  //       component: () => import("../views/layout/goods/goods.vue"),
  //       meta: {
  //         icon: "el-icon-goods"
  //       },
  //       children: [
  //         {
  //           path: "goods",
  //           name: "goods",
  //           component: () => import("../views/layout/goods/goodsgoods.vue"),
  //           meta: {
  //             title: "商品列表",
  //             icon: "el-icon-help"
  //           }
  //         },
  //         {
  //           path: "params",
  //           name: "params",
  //           component: () => import("../views/layout/goods/goodsparams.vue"),
  //           meta: {
  //             title: "分类参数",
  //             icon: "el-icon-bell"
  //           }
  //         },
  //         {
  //           path: "categories",
  //           name: "categories",
  //           component: () =>
  //             import("../views/layout/goods/goodscategories.vue"),
  //           meta: {
  //             title: "商品分类",
  //             icon: "el-icon-date"
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: "/orders",
  //       component: () => import("../views/layout/orders/orders.vue"),
  //       meta: {
  //         icon: "el-icon-s-order"
  //       },
  //       children: [
  //         {
  //           path: "orders",
  //           name: "orders",
  //           component: () => import("../views/layout/orders/ordersorders.vue"),
  //           meta: {
  //             title: "订单列表",
  //             icon: "el-icon-folder-add"
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: "/reports",
  //       component: () => import("../views/layout/reports/reports.vue"),
  //       meta: {
  //         icon: "el-icon-message"
  //       },
  //       children: [
  //         {
  //           path: "reports",
  //           name: "reports",
  //           component: () =>
  //             import("../views/layout/reports/reportsreports.vue"),
  //           meta: {
  //             title: "数据报表",
  //             icon: "el-icon-position"
  //           }
  //         }
  //       ]
  //     }
  //   ]
  //   //
  // },