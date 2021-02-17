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

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: homepage,
        },{
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