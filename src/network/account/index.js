import request from "@/network/request"
const testAPI = require("@/apis")

export const createAccount = config => request._post(testAPI.ACCOUNT_CREATE, config);
export const updateAccount = config => request._post(testAPI.ACCOUNT_UPDATE, config);
export const deleteById = config => request._delete(testAPI.ACCOUNT_DELETE, config);
export const getAllAccount= config => request._get(testAPI.ACCOUNT_QUERY, config)