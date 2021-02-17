import axios from 'axios'

import {
	VEHICLE_URL, PARTNER_URL, PREPAREDNESS_URL, RECORGNIZE_URL
} from '../urls/vhicleInfo.js'


/**
 * 车辆信息
 */
function vehicleRequest(method, params, data, pathVariale) {
    return new Promise((resolve, reject) => {
        axios({
            url: VEHICLE_URL + pathVariale,
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

/**
 * 
 * @param {String} method 
 * @param {JSON} params 
 * @param {JSON} data 
 */
function partnerRequest(method, params, data, path) {
    return new Promise((resolve, reject) => {
        axios({
            url: PARTNER_URL + path,
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

/**
 * 
 * @param {string} method 
 * @param {JSON} params 
 * @param {JSON} data 
 */
function preparednessRequest(method, params, data, path) {
    return new Promise((resolve, reject) => {
        axios({
            url: PREPAREDNESS_URL  + path,
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

function recorgnizeRequest(FormData) {
    return new Promise((resolve, reject) => {
        axios({
            url: RECORGNIZE_URL,
            method: 'POST',
            headers: {
                'Content-Type': "multipart/form-data",
                // token: sessionStorage.getItem('token')
            },
            //这部分非常重要，否则formdata会被转格式
            transformRequest: [function(){
                return FormData;
            }],
            params: {},
            data: FormData,
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
    vehicleRequest,
    partnerRequest,
    preparednessRequest,
    recorgnizeRequest
}