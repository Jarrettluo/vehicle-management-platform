import axios from 'axios'

import {
	STATISTICS_URL
} from '../urls/statistics.js'


/**
 * 查询统计数据
 */
function statisticsRequest() {
    return new Promise((resolve, reject) => {
        axios({
            url: STATISTICS_URL,
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
	statisticsRequest,
}