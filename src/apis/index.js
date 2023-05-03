//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

const AUTH = "/api/user/auth"
const LOGIN = "/api/user/login"
const REGISTER = '/api/user/register'

//账户管理
const ACCOUNT_QUERY = '/api/account/queryAll';
const ACCOUNT_CREATE = '/api/account/register';
const ACCOUNT_UPDATE = '/api/account/update';
const ACCOUNT_DELETE = '/api/account/delete';


//客户管理
const CUSTOMER_CREATE = '/api/CustomerManage/register';
const CUSTOMER_UPDATE = '/api/customer/update';
const CUSTOMER_DELETE = '/api/CustomerManage/delete';
const CUSTOMER_QUERY = '/api/customer/findByType';


//HR
const STAFF_CREATE = '/api/HR-create-user/create';
const STAFF_CHECK_IN = '/api/checkIn/checkIn';
const STAFF_GET_CHECK= '/api/checkIn/getCheckIn';
const STAFF_QUERY = '/api/HR-create-user/showAll';
const STAFF_DELETE='/api/HR-create-user/delete';

//审批
const PROMOTION_APPROVAL = '/api/promotion/approval';
const PROMOTION_CREATE = '/api/promotion/promotion-make';
const PROMOTION_ALL= '/api/promotion/get-show';
module.exports = {

    STAFF_CREATE,
    STAFF_CHECK_IN,
    STAFF_QUERY,
    STAFF_DELETE,
    STAFF_GET_CHECK,


    TEST_GET,
    TEST_POST,

    AUTH,
    LOGIN,
    REGISTER,

    ACCOUNT_QUERY,
    ACCOUNT_CREATE,
    ACCOUNT_UPDATE,
    ACCOUNT_DELETE,

    PROMOTION_APPROVAL,
    PROMOTION_ALL,
    PROMOTION_CREATE,

    CUSTOMER_UPDATE,
    CUSTOMER_DELETE,
    CUSTOMER_CREATE,
    CUSTOMER_QUERY

};
