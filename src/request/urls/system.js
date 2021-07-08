let BASE_URL = require("./baseUrl").BASE_URL;

const LOG_URL = BASE_URL + '/log';

const USER_LIST_URL = BASE_URL + '/user/list/'
const CHANGE_USER_PWD_URL = BASE_URL + '/user/changePwd/'
const CHANGE_USER_TYPE_URL = BASE_URL + '/user/changeType/'
const DELETE_USER_URL = BASE_URL + '/user/'

module.exports = {
    LOG_URL,
    USER_LIST_URL,
    CHANGE_USER_PWD_URL,
    CHANGE_USER_TYPE_URL,
    DELETE_USER_URL,
}