import axios from 'axios'

import {
    ADD_COMPANY_URL
} from '../urls/tryout'


/**
 * 添加公司信息
 * 试用申请！
 */
function addCompany(data) {
    return new Promise((resolve, reject) => {
        axios({
            url: ADD_COMPANY_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params:{},
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

export default {
    addCompany
}