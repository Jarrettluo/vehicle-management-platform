<template>
    <div style="font-size: 0.6rem;">
        <div>
            <mt-header title="销售统计报表">
                <router-link to="/statistics" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
                <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
            </mt-header>
        </div>
        <div style="margin: 6px 0; display: flex;text-align: center;flex-wrap: wrap; justify-content: space-between;padding: 6px 0px;">
            <div class="active-button" style="width: 25%; border-right: 1px solid #eaeaea;font-size: 0.6rem; " @click="lastMonth">
                <div><i class="fa fa-chevron-left"></i></div>
                <div>上一月</div>
            </div>
            <div style="line-height: 36px;font-size: 12px; color: #3d4049;">
                {{ year }}年 {{ month }} 月
            </div>
            <div class="active-button" style="width: 25%; border-left: 1px solid #eaeaea; font-size: 0.6rem;" @click="nextMonth">
                <div><i class="fa fa-chevron-right"></i></div>
                <div>下一月</div>
            </div>
        </div>

        <div style="display: flex;flex-wrap: wrap; justify-content: space-between;text-align: center; font-size: 12px;height: 36px;border-bottom: 2px solid #fff;line-height: 36px;">
            <div style="width: 25%;background-color: lightcoral;color: white;font-weight: bold;">本月总购车</div>
            <div style="width: 25%;text-align: left;padding: 0 4px; color: lightcoral;">{{ monthUnsaledStatAbstract.totalUnsaledNum }}辆</div>
            <div style="width: 25%;background-color: yellowgreen;color: white;font-weight: bold;">本月总售车</div>
            <div style="width: 25%;text-align: left;padding: 0 4px;color: #1c7430;">{{ monthSaledStatAbstract.totalSaledNum }}辆</div>
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; text-align: center; font-size: 12px;height: 36px;line-height: 36px;">
            <div style="width: 25%;background-color: lightcoral;color: white;font-weight: bold;">本月总支出</div>
            <div style="width: 25%;text-align: left;padding: 0 4px; color: lightcoral;">{{ monthUnsaledStatAbstract.totalOutcome }}</div>
            <div style="width: 25%;background-color: yellowgreen;color: white;font-weight: bold;">本月总收入</div>
            <div style="width: 25%;text-align: left;padding: 0 4px; color: #1c7430;">{{ monthSaledStatAbstract.totalIncome }}</div>
        </div>
        <div>

        </div>
        <div class="vehicle-item-group-title">
            售出车辆详情
        </div>
        <div class="vehicle-group-title">
            <div class="sort-item">车辆信息 <i class="fa fa-sort" ></i></div>
            <div class="sort-item">车辆利润 <i class="fa fa-sort" ></i></div>
        </div>

        <div class="vehicle-item-group" v-for="vehicle in monthSaledStat" :key="vehicle.id">
            <VehicleItem :vehicle-info="vehicle"></VehicleItem>
        </div>
        <div class="vehicle-item-group" v-if="monthSaledStat.length < 1" style="text-align: center">
            暂无数据
        </div>

        <div class="vehicle-item-group-title">
            购入车辆详情
        </div>
        <div class="vehicle-group-title" >
            <div class="sort-item" >车辆信息 <i class="fa fa-sort" ></i></div>
            <div class="sort-item" >车辆利润 <i class="fa fa-sort" ></i></div>
        </div>

        <div class="vehicle-item-group" v-for="vehicle in monthUnsaledStat" :key="vehicle.id">
            <VehicleItem :vehicle-info="vehicle"></VehicleItem>
        </div>
        <div class="vehicle-item-group" v-if="monthUnsaledStat.length < 1" style="text-align: center">
            暂无数据
        </div>

        <div style="width: 100%; height: 120px;">
        </div>

<!--        <div>-->
<!--            下载-->
<!--        </div>-->
    </div>
</template>

<script>
import "../../assets/css/font-awesome.css"
import VehicleItem from "./components/vehicleItem"
import StatisticsPageRequest from '../../request/requests/statistics'
import {Toast} from "mint-ui";

export default {
    name: "monthDetail.vue",
    data(){
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),

            monthSaledStat: [],
            monthSaledStatAbstract: {},
            monthUnsaledStat: [],
            monthUnsaledStatAbstract: {},

            vehicleMonth: [{
                id: 1,
                plate: "川A99098",
                model: "宝马312",
                income: 378700,
                outcome: 360000,
                profit: 8933.3,
            },{
                id: 2,
                plate: "川A525LC",
                model: "宝马525",
                income: 378700,
                outcome: 360000,
                profit: 9233,
            },{
                id: 3,
                plate: "川A94344",
                model: "长城H8",
                income: 378700,
                outcome: 360000,
                profit: 10003.1,
            },{
                id: 4,
                plate: "川A8K893",
                model: "奔驰GLC",
                income: 378700,
                outcome: 360000,
                profit: 12933,
            }]
        }
    },
    components: {
        VehicleItem
    },
    mounted() {
        this.getParams();
    },
    methods: {
        /**
         * 获取路由参数
         * @author 罗佳瑞
         * @since 2021年1月19日
         */
        getParams () {
            let year = this.$route.query.year
            if(year > 2019 && year < 2100){
                this.year = year;
            }else {
                console.log(year)
            }
            let month = this.$route.query.month
            if( month > 0 && month < 13) {
                this.month = month
            }else {
                console.log(month)
            }
            this.getSaledData();
            this.getUnsaledData()
        },
        jump(vehicleId){
            this.$router.push({
                path: '/vehicleRegister',
                query: {
                    vehicleId: vehicleId
                }
            })
        },

        goBack(){
            this.$router.go(-1);
        },
        /**
         * 统计全部的当月的已经销售的车辆信息
         * @returns {Promise<void>}
         */
        async getSaledData(){
            this.monthSaledStat = []
            let params = {
                companyId: sessionStorage.getItem("companyId"),
                year: this.year,
                month: this.month
            }
            await StatisticsPageRequest.monthSaledRequest(params)
                .then(res => {
                    this.updateSaledData(res)
                })
                .catch(err => {
                    console.log(err)
                    Toast("获取失败，检查网络")
                })
        },
        /**
         * 更新当月销售数据
         * @param res
         */
        updateSaledData(res){
            if(res.code == 200){
                this.monthSaledStatAbstract = res.data.abstractInfo
                res.data['vehiceInfo'].forEach(item => {
                    this.monthSaledStat.push(
                        {
                            id: item.id,
                            pId: item.id,
                            plate: item.vehiclePlate, // 车牌
                            model: item.vehicleBrand, // 车型
                            income: item['saleItem'].salePrice + item['saleItem'].mortgageRebate + item['saleItem'].insuranceRefund, // 收入
                            outcome: item.purchasePrice + item['saleItem'].repairPrice, // 支出
                            profit: item['saleItem'].selfProfit, // 纯利润
                        }
                    )
                })
            }else {
                console.log(res)
            }
        },
        /**
         * 更新当月购入车辆数据
         * @returns {Promise<void>}
         */
        async getUnsaledData(){
            this.monthUnsaledStat = []
            let params = {
                companyId: sessionStorage.getItem("companyId"),
                year: this.year,
                month: this.month
            }
            await StatisticsPageRequest.monthUnsaledRequest(params)
                .then(res => {
                    this.updateUnsaledData(res)
                })
                .catch(err => {
                    Toast("获取失败，检查网络")
                    console.log(err)
                })
        },
        /**
         * 更新当月购入车辆的数据
         * @param res
         */
        updateUnsaledData(res){
            if(res.code === 200){
                this.monthUnsaledStatAbstract = res.data.abstractInfo
                res.data['vehiceInfo'].forEach(item => {
                    let outcome = 0;
                    if(item.preparednesses.length > 0){
                        item.preparednesses.forEach(element => {
                            outcome += element.repairPrice
                        })
                    }
                    if(item.saleItem == null){
                        this.monthUnsaledStat.push(
                            {
                                id: item.id,
                                pId: item.id, // 参数传递专用
                                plate: item.vehiclePlate, // 车牌
                                model: item.vehicleBrand, // 车型
                                income: null, // item['saleItem'].salePrice + item['saleItem'].mortgageRebate + item['saleItem'].insuranceRefund, // 收入
                                outcome: item.purchasePrice + outcome, // 支出
                                profit: null // 纯利润
                            }
                        )
                    }else {
                        this.monthUnsaledStat.push(
                            {
                                id: 'unsale' + item.id,
                                pId: item.id,
                                plate: item.vehiclePlate, // 车牌
                                model: item.vehicleBrand, // 车型
                                income: item['saleItem'].salePrice + item['saleItem'].mortgageRebate + item['saleItem'].insuranceRefund, // 收入
                                outcome: item.purchasePrice + item['saleItem'].repairPrice, // 支出
                                profit: item['saleItem'].selfProfit, // 纯利润
                            }
                        )
                    }

                })
            }else {
                console.log(res)
            }
        },

        lastMonth(){
            this.month --;
            if(this.month == 0){
                this.year --;
                this.month = 12;
            }
            this.getSaledData();
            this.getUnsaledData();
        },
        nextMonth() {
            this.month ++;
            if(this.month == 13){
                this.year ++;
                this.month = 1;
            }
            this.getSaledData();
            this.getUnsaledData();
        }

    }
}
</script>

<style scoped>
*{
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
}
.vehicle-item-group-title {
    margin-top: 10px;
    padding: 10px 0px 10px 10px;
    font-size: 1rem;
    color: #3d4049;
    background-color: #e5e5e5;
}
.vehicle-group-title {
    height: 32px;
    display: flex;
    justify-content:space-between;
    vertical-align: bottom;
}

.sort-item {
    width: 33%;
    text-align: center;
    padding: 12px 0 0 0;
}

.sort-item:hover {
    color: #0062cc;
}
.sort-item:visited {
    color: #0062cc;
}

.active-button:active {
    color: white;
    border-radius: 5px;
    background: #ccc;
    opacity: 0.5;
}
</style>