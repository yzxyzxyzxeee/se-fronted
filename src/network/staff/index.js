import request from "@/network/request"
const testAPI = require("@/apis")

export const createStaff = config => request._post(testAPI.STAFF_CREATE, config);
export const checkIn = config => request._post(testAPI.STAFF_CHECK_IN, config);

export const getAllStaff = config => request._post(testAPI.STAFF_QUERY, config);
export const deleteStaffByName = config => request._delete(testAPI.STAFF_DELETE, config);
export const getStaffByName = config => request._post(testAPI.STAFF_NAME,config);
export const ediePas = config => request._post(testAPI.STAFF_PAW,config);
export const getPerformanceByName = config => request._post(testAPI.PERFORMANCE_STAFF,config);