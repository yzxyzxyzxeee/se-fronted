// 部署url
export const REQUEST_BASE_URL_PROD = "http://ismzl.com/";
// 开发url
export const REQUEST_BASE_URL_DEV = "http://localhost:8080";

export const ROLE = {
  INVENTORY_MANAGER: "INVENTORY_MANAGER", //库存管理人员 1
  SALE_STAFF: "SALE_STAFF", // 进货销售人员 1
  SALE_MANAGER: "SALE_MANAGER", //销售经理 1
  FINANCIAL_STAFF: "FINANCIAL_STAFF", // 财务人员
  HR: "HR", // 人力资源人员
  GM: "GM", // 总经理 1
  ADMIN: "ADMIN" // 最高权限
};


export const PATH = {

  // INVENTORY_MANAGER
  InventoryManager: {
    path: '/inventoryManager',
    requiresAuth: [ROLE.INVENTORY_MANAGER]
  },
  // SALE_STAFF
  SaleStaff: {
    path: '/saleStaff',
    requiresAuth: [ROLE.SALE_STAFF]
  },
  PromotionMake:{
    path:'/promotion_make',
    requiresAuth:[ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM]
  },
  // SALE_MANAGER
  SaleManager: {
    path:'/saleManager',
    requiresAuth:[ROLE.SALE_MANAGER]
  },
  // FINANCIAL_STAFF
  FinancialStaff :{
    path:'/financialStaff',
    requiresAuth:[ROLE.FINANCIAL_STAFF]
  },
  // GM
  GM: {
    path: '/GM',
    requiresAuth: [ROLE.GM,ROLE.ADMIN]
  },
  PromotionView:{
    path:"/promotion",
    requiresAuth:[ROLE.GM,ROLE.SALE_MANAGER,ROLE.ADMIN]
  },
  CustomerView:{
    path:"/customerView",
    requiresAuth:[ROLE.GM,ROLE.ADMIN]
  },

  // admin
  ADMIN:{
    path: '/adminView',
    requiresAuth: [ROLE.ADMIN]
  },
  //HR
  STAFF_REGISTRATION_VIEW: {
    path: '/staffRegistrationView',
    requiresAuth: [ROLE.HR, ROLE.ADMIN]
  },
  STAFF_CLOCKIN_VIEW: {
    path: '/staffClockInView',
    requiresAuth: [ROLE.HR, ROLE.ADMIN,ROLE.SALE_STAFF,ROLE.FINANCIAL_STAFF,ROLE.SALE_MANAGER,ROLE.INVENTORY_MANAGER,ROLE.GM]
  },
  EXCEL_OUT: {
    path: '/excelOut',
    requiresAuth: [ROLE.HR, ROLE.ADMIN,ROLE.SALE_STAFF,ROLE.FINANCIAL_STAFF,ROLE.SALE_MANAGER,ROLE.INVENTORY_MANAGER,ROLE.GM]
  }
}
