import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import MintUI from 'mint-ui'
Vue.use(MintUI)

import homepage from '../views/homepage'
import vehicleList from '../views/vehicleList'
import vehicleRegister from '../views/vehicleRegister'
import saleVehicle from '../views/saleVehicle'
import statistics from '../views/statistics'
import copyrightPage from "../views/copyright"

import test from "../views/Test"
import { Toast } from 'mint-ui';
import { formatDate } from "../plugin/utils"

Vue.use(Router)
Vue.use(BootstrapVue)

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: "",
            redirect: "/homepage"
        },
        {
            path: '/loginPage',
            name: 'loginPage',
            component: ()=>import("../views/login/index.vue"),
        },{
            path: '/homepage',
            name: 'homepage',
            component: homepage,
        },
        {
            path: '/vehicleList',
            name: 'vehicleList',
            component: vehicleList
        },{
            path: '/vehicleRegister',
            name: 'vehicleRegister',
            component: vehicleRegister
        },{
            path: '/partnerRegister',
            name: 'partnerRegister',
            component: ()=>import("../views/vehicleRegister/addPartner.vue")
        },{
            path: '/preparednessRegister',
            name: 'preparednessRegister',
            component: ()=>import("../views/vehicleRegister/addPreparedness.vue")
        },{
            path: '/saleVehicle',
            name: 'saleVehicle',
            component: saleVehicle
        },{
            path: '/systemSetting',
            name: 'systemSetting',
            component: ()=>import("../views/System/index.vue"),
            children: []
        },{
            path: '/systemSetting/accountSetting',
            name: 'accountSetting',
            component: ()=>import("../views/System/accountSetting/index.vue"),
        },,{
            path: '/systemSetting/systemLog',
            name: 'systemLog',
            component: ()=>import("../views/System/systemLog/index.vue"),
        },{
            path: '/statistics',
            name: 'statistics',
            component: statistics
        },{
            path: '/copyright',
            name: 'copyright',
            component: copyrightPage,
        },{
            path: '/test',
            name: 'test',
            component: test,
        }
    ]
})

router.beforeEach((to, from, next) => {
    // 验证是否有token，如果在非登录页没有token，就跳转到登录页面
    if (to.name !== 'loginPage' && !sessionStorage.getItem("token")) next({ name: 'loginPage' })
    // 每次跳转的时候进行验证账号是否过期，如果过期跳转到登录页面/充值页面
    else if (to.name !== 'loginPage' && sessionStorage.getItem("token")) {
        let expirationTime = sessionStorage.getItem("expirationTime")
        var futureTime = new Date(expirationTime);
        if(futureTime < new Date()) {
            Toast({
                message: '您的账号已经于'+ formatDate(futureTime, "yyyy-MM-dd hh:mm:ss") +'失效！跳转到登录页面',
                position: 'bottom',
                duration: 2000
            });
            next({
                name: 'loginPage'
            })
        }else {
            next()
        }
    } 
    else next()
})



export default router;