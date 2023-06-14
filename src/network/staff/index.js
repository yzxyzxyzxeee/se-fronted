import request from "@/network/request"
const testAPI = require("@/apis")

export const createStaff = config => request._post(testAPI.STAFF_CREATE, config);
export const checkIn = config => request._post(testAPI.STAFF_CHECK_IN, config);


export const getClockIn = config => request._get(testAPI.STAFF_GET_CHECK, config);


export const getAllStaff = config => request._post(testAPI.STAFF_QUERY, config);
export const deleteStaffByName = config => request._delete(testAPI.STAFF_DELETE, config);