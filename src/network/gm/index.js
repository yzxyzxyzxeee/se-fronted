import request from "@/network/request";
import config from "vue/src/core/config";
const testAPI = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const getClockIn = config => request._get(testAPI.STAFF_GET_CHECK, config);
export const AddPerformance = config => request._post(testAPI.PERFORMANCE_ADD,config);