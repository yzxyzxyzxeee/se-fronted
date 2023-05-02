import request from "@/network/request"
const testAPI = require("@/apis")


export const getAllPromotion = config => request._get(testAPI.PROMOTION_ALL,config);
export const firstApproval = config => request._get(testAPI.PROMOTION_FIRST_APPROVAL, config);
export const secondApproval = config => request._get(testAPI.PROMOTION_SECOND_APPROVAL, config);
export const createPromotion = config =>request._get(testAPI.PROMOTION_CREATE,config);