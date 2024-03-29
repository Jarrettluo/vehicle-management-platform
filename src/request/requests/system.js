import axios from 'axios'
import qs from 'qs'

import {
	LOG_URL, USER_LIST_URL,
    CHANGE_USER_PWD_URL,
    CHANGE_USER_TYPE_URL,
    DELETE_USER_URL,

    PREPARATORY_ADD_URL,
    PREPARATORY_REMOVE_URL,
    PREPARATORY_UPDATE_URL,
    PREPARATORY_LIST_URL,

    COMPANY_URL,
} from '../urls/system'


/**
 * 查询日志信息
 */
function logRequest(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: LOG_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            paramsSerializer: params => {
                return qs.stringify(params, { indices: false })
              },
            params: params,
            data:{},
        })
        .then((res) => {
            // 成功
            resolve(res.data)
        })
        .catch((res) => {
            // 失败
            reject(res)
        })
    })
}


/**
 * 查询用户列表
 */
 function userListRequest(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: USER_LIST_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params: params,
            data:{},
        })
        .then((res) => {
            // 成功
            resolve(res.data)
        })
        .catch((res) => {
            // 失败
            reject(res)
        })
    })
}
/**
 * @description 修改用户的密码
 * @param { Object } params { userId: String, oldPwd: String, newPwd: String} 
 * @returns 
 */
function changePwdRequest(data) {
    return new Promise((resolve, reject) => {
        axios({
            url: CHANGE_USER_PWD_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params: {},
            data:data,
        })
        .then((res) => {
            // 成功
            resolve(res.data)
        })
        .catch((res) => {
            // 失败
            reject(res)
        })
    })
}
/**
 * @description 修改用户的角色
 * @param { Object } params {adminId: String, userId: String} 
 * @returns 
 */
 function changeTypeRequest(data) {
    return new Promise((resolve, reject) => {
        axios({
            url: CHANGE_USER_TYPE_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params: {},
            data: data,
        })
        .then((res) => {
            // 成功
            resolve(res.data)
        })
        .catch((res) => {
            // 失败
            reject(res)
        })
    })
}
/**
 * @description 管理员删除用户
 * @param { Object } params {adminId: String, userId: String} 
 * @returns 
 */
 function deleteUserRequest(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: DELETE_USER_URL,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params: params,
            data:{},
        })
        .then((res) => {
            // 成功
            resolve(res.data)
        })
        .catch((res) => {
            // 失败
            reject(res)
        })
    })
}

/**
 * 增加自定义项目
 * @param params
 * @returns {Promise<unknown>}
 */
function addPreparatoryItem(data) {
    return new Promise((resolve, reject) => {
        axios({
            url: PREPARATORY_ADD_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params: {},
            data: data,
        })
            .then((res) => {
                // 成功
                resolve(res.data)
            })
            .catch((res) => {
                // 失败
                reject(res)
            })
    })
}

/**
 * 删除自定义的整备项目
 * @param params
 * @returns {Promise<unknown>}
 */
function removePreparatoryItem(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: PREPARATORY_REMOVE_URL,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params: params,
            data:{},
        })
            .then((res) => {
                // 成功
                resolve(res.data)
            })
            .catch((res) => {
                // 失败
                reject(res)
            })
    })
}

/**
 * 更新用户自定义的整备项目内容
 * @param params
 * @returns {Promise<unknown>}
 */
function updatePreparatoryItem(data) {
    return new Promise((resolve, reject) => {
        axios({
            url: PREPARATORY_UPDATE_URL,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params: {},
            data: data,
        })
            .then((res) => {
                // 成功
                resolve(res.data)
            })
            .catch((res) => {
                // 失败
                reject(res)
            })
    })
}

/**
 * 查询全部的整备项目列表
 * @param params
 * @returns {Promise<unknown>}
 */
function allPreparatoryItem(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: PREPARATORY_LIST_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params: params,
            data:{},
        })
            .then((res) => {
                // 成功
                resolve(res.data)
            })
            .catch((res) => {
                // 失败
                reject(res)
            })
    })
}

/**
 * @description 查找公司信息
 * @param { Object } params {companyId: Long} 
 * @returns 
 */
 function findCompanyRequest(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: COMPANY_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params: params,
            data:{},
        })
        .then((res) => {
            // 成功
            resolve(res.data)
        })
        .catch((res) => {
            // 失败
            reject(res)
        })
    })
}


export default {
	logRequest,
    userListRequest,
    changePwdRequest,
    changeTypeRequest,
    deleteUserRequest,

    addPreparatoryItem,
    removePreparatoryItem,
    updatePreparatoryItem,
    allPreparatoryItem,

    findCompanyRequest,
}