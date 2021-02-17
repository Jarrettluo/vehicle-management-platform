import axios from 'axios'

import {
    SALEITEM_URL
} from '../urls/saleItem.js'


/**
 * 查询统计数据
 */
function saleItemRequest(method, params, data, pathVariable) {
    return new Promise((resolve, reject) => {
        axios({
            url: SALEITEM_URL + pathVariable,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                // token: sessionStorage.getItem('token')
            },
            params: params,
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
	saleItemRequest,
}