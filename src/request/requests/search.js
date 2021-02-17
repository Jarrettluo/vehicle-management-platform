import axios from 'axios'

import {
	SEARCH_URL
} from '../urls/searchPage.js'


/**
 * 车辆信息
 */
function searchRequest(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: SEARCH_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // token: sessionStorage.getItem('token')
            },
            params: params,
            data: {},
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
    searchRequest
}