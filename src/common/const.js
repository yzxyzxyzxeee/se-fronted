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
    path: '/GM',
    requiresAuth: [ROLE.GM,ROLE.ADMIN]
  },
  // admin
  ADMIN:{
    path: '/adminView',
    requiresAuth: [ROLE.ADMIN]
  },
  STAFF_REGISTRATION_VIEW: {
    path: '/staffRegistrationView',
    requiresAuth: [ROLE.ADMIN]
  },
  PERFORMANCE_IN: {
    path: "/performanceInView",
    requiresAuth:[ROLE.ADMIN]
  },
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
    path:"/eidtpasswordView",
    requiresAuth:[ROLE.GM,ROLE.STAFF,ROLE.ADMIN]
  },
  //导出绩效
  EXCEL_OUT: {
    path: '/excelOut',
    requiresAuth: [ROLE.GM]
  },
  STAFF_INFO:{
    path: "/staffInfoView",
    requiresAuth: [ROLE.STAFF]
  }
}
