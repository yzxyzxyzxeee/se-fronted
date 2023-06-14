import request from "@/network/request"
const testAPI = require("@/apis")

export const PerformaceInport = config => request._post(testAPI.STAFF_CREATE, config);
export const StaffInport = config => request._post(testAPI.STAFF_IN,config);