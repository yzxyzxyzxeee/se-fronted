//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

const AUTH = "/api/user/auth"
const LOGIN = "/api/user/login"
const REGISTER = '/api/user/register'




const STAFF_CREATE = '/api/admin-create-GM/create';
const STAFF_CHECK_IN = '/api/checkIn/checkIn';
const STAFF_GET_CHECK= '/api/checkIn/getCheckIn';
const STAFF_QUERY = '/api/admin-create-GM/showAll';
const STAFF_DELETE ='/api/admin-create-GM/delete';
const STAFF_NAME = "/api/staff/showInfo";
const STAFF_PAW = "/api/user/edit";
const STAFF_IN = "/api/admin-create-GM/createAll"
const PERFORMANCE_IN ="/api/performance/save";
const PERFORMANCE_QUERY = '/api/performance/findAll'
const PERFORMANCE_STAFF = '/api/performance/findByName'
const PERFORMANCE_ADD = '/api/performance/save'

module.exports = {

    STAFF_CREATE,
    STAFF_CHECK_IN,
    STAFF_QUERY,
    STAFF_DELETE,
    STAFF_GET_CHECK,
    STAFF_IN,
    PERFORMANCE_IN,
    PERFORMANCE_QUERY,
    PERFORMANCE_STAFF,
    PERFORMANCE_ADD,

    TEST_GET,
    TEST_POST,

    AUTH,
    LOGIN,
    REGISTER,
    STAFF_NAME,
    STAFF_PAW
};
