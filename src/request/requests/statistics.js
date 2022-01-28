import axios from 'axios'

import {
	STATISTICS_URL, YEAR_STAT_URL, MONTH_SALED_URL, MONTH_UNSALED_URL
} from '../urls/statistics.js'


/**
 * 查询统计数据
 */
function statisticsRequest(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: STATISTICS_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params:params,
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
 * 查询各月份的统计数据
 */
function statisticsMonthRequest(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: YEAR_STAT_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params:params,
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
 * 统计某月的已经销售的情况
 */
function monthSaledRequest(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: MONTH_SALED_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params:params,
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
 * 统计某月购入车辆的情况
 */
function monthUnsaledRequest(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: MONTH_UNSALED_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            },
            params:params,
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
	statisticsRequest, statisticsMonthRequest, monthSaledRequest, monthUnsaledRequest
}