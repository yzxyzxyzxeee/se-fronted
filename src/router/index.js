import Vue from "vue";
import VueRouter from "vue-router";
import { ROLE, PATH } from "../common/const";
import FinancialStaff from "@/views/financialStaff/FinancialStaff";



const Error = () => import("../components/content/Error");
const Login = () => import("../views/auth/Login");
const Home = () => import("../views/Home");
const AccountManagement = () => import("../views/account/AccountManagement");
const FinancialStaffView = () => import("../views/financialStaff/FinancialStaff");
const SaleStaffView = () => import("../views/SaleStaff/SaleStaff");
const SaleManagerView = () => import("../views/SaleManager/SaleManager");
const InventoryManagerView = () => import("../views/InventoryManager/InventoryManager");


const StaffClockInView = () => import("../views/staff/staffClockInView")
const StaffRegistrationView = () => import("../views/staff/staffRegistrationView")
const Approval = () => import("../views/approval/Approval");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/error",
    component: Error
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: () => import("@/views/auth/register.vue")
  },

    //账户管理
  {
    path: PATH.ADMIN_ACCOUNT_MANAGEMENT.path,
    component: AccountManagement,
    meta: { requiresAuth: PATH.ADMIN_ACCOUNT_MANAGEMENT.requiresAuth }
  },

  // 审批
  {
    path: PATH.GM.path,
    component: Approval,
    meta: { requiresAuth: PATH.GM.requiresAuth}
  },

  //员工管理
  {
    path: PATH.STAFF_CLOCKIN_VIEW.path,
    component: StaffClockInView,
    name: "StaffClockInView",
    meta: { requiresAuth: PATH.STAFF_CLOCKIN_VIEW.requiresAuth }
  },
  {
    path: PATH.STAFF_REGISTRATION_VIEW.path,
    component: StaffRegistrationView,
    name: "StaffRegistrationView",
    meta: { requiresAuth: PATH.STAFF_REGISTRATION_VIEW.requiresAuth }
  },
  //财政
  {
    path: PATH.FinancialStaff.path,
    component:FinancialStaffView,
    name:"FinancialStaffView",
    meta: { requiresAuth: PATH.FinancialStaff.requiresAuth}
  },
  //销售
  {
    path: PATH.SaleStaff.path,
    component:SaleStaffView,
    name:"SaleStaffView",
    meta: { requiresAuth: PATH.SaleStaff.requiresAuth}
  },
  //销售经理
  {
    path: PATH.SaleManager.path,
    component:SaleManagerView,
    name:"SaleManagerView",
    meta: { requiresAuth: PATH.SaleManager.requiresAuth}
  },
  //库存管理
  {
    path: PATH.InventoryManager.path,
    component:InventoryManagerView,
    name:"SaleManagerView",
    meta: { requiresAuth: PATH.InventoryManager.requiresAuth}
  },


  // -----------------------未找到页面-----------------------------
  {
    path: "*",
    redirect: "/error"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  // console.log(to.path);
  if (to.path === "/error" || to.path === "/login") {
    console.log(to.path.toString());
    console.log("222");
    next();
  } else if (to.path === "/") {
    let token = sessionStorage.getItem("token");
    let role = sessionStorage.getItem("role");
    if (token == null || role == null) next("/login");
    else next();
  } else if (to.meta.requiresAuth) {
    if (
      to.meta.requiresAuth.some(
        role => role.toString() === sessionStorage.getItem("role")
      )
    ) {
      //有权限
      // console.log("获得访问权限");
      next()
    } else {
      // console.log("无权限访问");
      next("/"); //无权限,跳回主页
    }
  } else {
    // 非法路径, 直接next (跳转error)
    console.log("111");
    next();
  }
});

export default router;
