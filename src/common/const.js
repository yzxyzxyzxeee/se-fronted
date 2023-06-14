// 部署url
export const REQUEST_BASE_URL_PROD = "http://ismzl.com/";
// 开发url
export const REQUEST_BASE_URL_DEV = "http://localhost:8080";

export const ROLE = {
  STAFF:"STAFF",//员工
  GM: "GM", // 总经理
  ADMIN: "ADMIN" // 管理员
};

export const PATH = {
  // GM
  GM: {
    path: '/GMView',
    requiresAuth: [ROLE.GM]
  },
  // admin
  ADMIN:{
    path: '/adminView',
    requiresAuth: [ROLE.ADMIN]
  },
  //员工
  STAFF: {
    path:"/staffView",
    requiresAuth:[ROLE.STAFF]
  },
  //添加主管信息
  STAFF_REGISTRATION_VIEW: {
    path: '/staffRegistrationView',
    requiresAuth: [ROLE.ADMIN]
  },
  //添加绩效
  PERFORMANCE_ADD:{
    path:"addPerformance",
    requiresAuth:[ROLE.GM]
  },
  //绩效导入
  PERFORMANCE_IN: {
    path: "/performanceInView",
    requiresAuth:[ROLE.ADMIN]
  },
  //主管信息导入
  STAFF_IN: {
    path: "/StaffInView",
    requiresAuth:[ROLE.ADMIN]
  },
  //打卡
  STAFF_CHECKIN_VIEW: {
    path: '/staffClockInView',
    requiresAuth: [ROLE.STAFF,ROLE.GM,ROLE.ADMIN]
  },
  // 改密码
  EDIT_PASSWORD_VIEW:{
    path:"/editPasswordView",
    requiresAuth:[ROLE.GM,ROLE.STAFF,ROLE.ADMIN]
  },
  //查看绩效
  SHOW_PERFORMANCE:{
    path:"/PerformanceShow",
    requiresAuth:[ROLE.STAFF]
  },
  //导出绩效
  EXCEL_OUT: {
    path: '/excelOut',
    requiresAuth: [ROLE.GM]
  },
  //查看个人信息
  STAFF_INFO:{
    path: "/staffInfoView",
    requiresAuth: [ROLE.STAFF]
  }
}
