import axios from 'axios'

import {
	LOG_URL
} from '../urls/system'


/**
 * 查询统计数据
 */
function logRequest() {
    return new Promise((resolve, reject) => {
        axios({
            url: LOG_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params:{},
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
}