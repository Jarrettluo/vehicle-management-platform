let BASE_URL = require("./baseUrl").BASE_URL;

const LOG_URL = BASE_URL + '/log';

const USER_LIST_URL = BASE_URL + '/user/list/'
const CHANGE_USER_PWD_URL = BASE_URL + '/user/changePwd/'
const CHANGE_USER_TYPE_URL = BASE_URL + '/user/changeType/'
const DELETE_USER_URL = BASE_URL + '/user/'

const PREPARATORY_ADD_URL = BASE_URL + '/preparatoryItem/addItem'
const PREPARATORY_REMOVE_URL = BASE_URL + '/preparatoryItem/removeItem'
const PREPARATORY_UPDATE_URL = BASE_URL + '/preparatoryItem/updateItem'
const PREPARATORY_LIST_URL = BASE_URL + '/preparatoryItem/list'

const COMPANY_URL = BASE_URL + '/company/'

module.exports = {
    LOG_URL,
    USER_LIST_URL,
    CHANGE_USER_PWD_URL,
    CHANGE_USER_TYPE_URL,
    DELETE_USER_URL,

    PREPARATORY_ADD_URL,
    PREPARATORY_REMOVE_URL,
    PREPARATORY_UPDATE_URL,
    PREPARATORY_LIST_URL,

    COMPANY_URL
}