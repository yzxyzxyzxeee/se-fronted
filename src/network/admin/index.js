import request from "@/network/request"
const testAPI = require("@/apis")

export const PerformanceImport = config => request._post(testAPI.PERFORMANCE_IN, config);
export const StaffImport = config => request._post(testAPI.STAFF_IN,config);