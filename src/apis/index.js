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


module.exports = {

    STAFF_CREATE,
    STAFF_CHECK_IN,
    STAFF_QUERY,


    TEST_GET,
    TEST_POST,

    AUTH,
    LOGIN,
    REGISTER,

    ACCOUNT_QUERY,
    ACCOUNT_CREATE,
    ACCOUNT_UPDATE,
    ACCOUNT_DELETE

};
