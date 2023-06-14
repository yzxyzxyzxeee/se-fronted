import Vue from "vue";
import VueRouter from "vue-router";
import { ROLE, PATH } from "../common/const";
import GM from "@/views/GMView/gmView";
import adminView from "@/views/AdminView/adminView";



const Error = () => import("../components/content/Error");
const Login = () => import("../views/auth/Login");
const Home = () => import("../views/Home");
const admin_View = () => import("../views/AdminView/adminView");
const staffView = () => import("../views/StaffView/staffView");
const StaffClockInView = () => import("../views/staff/staffClockInView");
const StaffRegistrationView = () => import("../views/AdminView/staffRegistrationView");
const gmView = () => import("../views/GMView/gmView");
const OutInfo = () => import("../views/GMView/excelOut");
const EditPassword =() => import("../views/staff/EditPassword");
const StaffInfo =()=>import("../views/StaffView/staffView.vue")

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

  //Admin
  {
    path: PATH.ADMIN.path,
    component: admin_View,
    name:"AdminView",
    meta: { requiresAuth: PATH.ADMIN.requiresAuth }
  },

  // GM
  {
    path: PATH.GM.path,
    component: gmView,
    meta: { requiresAuth: PATH.GM.requiresAuth}
  },
  //Staff
  {
    path: PATH.STAFF.path,
    component:staffView,
    name:"StaffView",
    meta:{ requiresAuth: PATH.STAFF.requiresAuth}
  },

  //员工管理
  {
    path: PATH.STAFF_CHECKIN_VIEW.path,
    component: StaffClockInView,
    name: "StaffClockInView",
    meta: { requiresAuth: PATH.STAFF_CHECKIN_VIEW.requiresAuth }
  },
  {
    path: PATH.STAFF_REGISTRATION_VIEW.path,
    component: StaffRegistrationView,
    name: "StaffRegistrationView",
    meta: { requiresAuth: PATH.STAFF_REGISTRATION_VIEW.requiresAuth }
  },
  {
    path:PATH.EXCEL_OUT.path,
    component:OutInfo,
    meta:{ requiresAuth: PATH.EXCEL_OUT.requiresAuth }
  },
  {
    path: PATH.EDIT_PASSWORD_VIEW.path,
    component:EditPassword,
    meta: { requiresAuth: PATH.EDIT_PASSWORD_VIEW.requiresAuth}
  },
  {
    path:PATH.STAFF_INFO.path,
    component:StaffInfo,
    meta:{requiresAuth: PATH.STAFF_INFO.requiresAuth}
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
      console.log("无权限访问");
      next("/"); //无权限,跳回主页
    }
  } else {
    // 非法路径, 直接next (跳转error)
    console.log("111");
    next();
  }
});

export default router;
