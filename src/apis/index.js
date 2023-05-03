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


//HR
const STAFF_CREATE = '/api/HR-create-user/create';
const STAFF_CHECK_IN = '/api/checkIn/checkIn';
const STAFF_QUERY = '/api/HR-create-user/showAll';
const STAFF_DELETE='/api/HR-create-user/delete'

//审批
const PROMOTION_FIRST_APPROVAL = '/api/promotion/first-approval';
const PROMOTION_SECOND_APPROVAL = '/api/promotion/second-approval';
const PROMOTION_ALL = '/api/promotion/show_all';
const PROMOTION_CREATE = '/api/promotion_make';
module.exports = {

    STAFF_CREATE,
    STAFF_CHECK_IN,
    STAFF_QUERY,
    STAFF_DELETE,


    TEST_GET,
    TEST_POST,

    AUTH,
    LOGIN,
    REGISTER,

    ACCOUNT_QUERY,
    ACCOUNT_CREATE,
    ACCOUNT_UPDATE,
    ACCOUNT_DELETE,

    PROMOTION_FIRST_APPROVAL,
    PROMOTION_SECOND_APPROVAL,
    PROMOTION_ALL,
    PROMOTION_CREATE

};
