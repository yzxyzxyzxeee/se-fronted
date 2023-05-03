import request from "@/network/request"
const testAPI = require("@/apis")


export const getAllPromotion = config => request._get(testAPI.PROMOTION_ALL,config);
export const Approval = config => request._post(testAPI.PROMOTION_APPROVAL, config);
export const createPromotion = config =>request._post(testAPI.PROMOTION_CREATE,config);