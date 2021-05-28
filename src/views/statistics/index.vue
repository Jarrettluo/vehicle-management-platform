<template>
    <div >
        <mt-header title="销售统计报表">
            <router-link to="/homepage" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>
        <div style="padding: 14px;">
            <br>
            <h4 style="color: #1f4e79">年度报表</h4>
            <div class="report-item shadow-sm" style="background-color: #ff6666">
                <div class="report-value">
                    <h3>{{ statisticsData.totalSales?statisticsData.totalSales:0.00 }}</h3>
                </div>
                <div class="report-name">
                    累计销售额（元）
                </div>
            </div>
            <div class="report-item shadow-sm" style="background-color: #ff9900">
                <div class="report-value">
                    <h3>{{ statisticsData.totalProfit?statisticsData.totalProfit:0.00 }}</h3>
                </div>
                <div class="report-name">
                    累计利润（元）
                </div>
            </div>
            <div>
                <div class="row">
                    <div class="col">
                        <div class="item-left shadow-sm" @click="linkToUnsale">
                            <div class="half-card-value">
                                <h3>{{ statisticsData.totalNotSold }}</h3>
                            </div>
                            <div class="half-card-name">
                                在售车辆总数(辆)
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="item-right shadow-sm" @click="linkToSaled">
                            <div class="half-card-value">
                                <h3>{{ statisticsData.totalSold }}</h3>
                            </div>
                            <div class="half-card-name">
                                已售车辆总数(辆)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import StatisticsPageRequest from '../../request/requests/statistics'
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            statisticsData: {
                totalSales: 0,
                totalProfit: 0,
                totalNotSold: 0,
                totalSold: 0,
            }
        }
    },
    mounted() {
        this.acquireStatistics();
    },
    methods: {
        /**
         * 异步获取后台的数据
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        async acquireStatistics(){
            await StatisticsPageRequest.statisticsRequest()
                .then(res => {
                    this.updateStatisticsDate(res)
                })
                .catch(err => {
                    Toast("获取失败，检查网络")
                })
        },
        
        /**
         * 数据更新到dom
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        updateStatisticsDate(res) {
            if (res.code === 200) {
                this.statisticsData = res.data
            }
        },

        linkToUnsale() {
            this.$router.push({
                path: '/vehicleList',
                query: {
                id: "1",
                }
            })
        },

        linkToSaled(){
            this.$router.push({
                path: '/vehicleList',
                query: {
                id: "2",
                }
            })
        }
    }
}
</script>

<style scoped>
.report-item{
    border-radius: 4px;
    margin-top: 10px;
    color: white;
    padding: 15px;
}

.report-value {
    text-align: right;
}

.h3 {
    font: bold;
}

.report-name {
    text-align: right;
}

.item-left {
    border-radius: 4px;
    margin-top: 10px;
    color: white;
    padding: 15px;
    margin-right: -10px;
    text-align: center;
}

.item-right {
    border-radius: 4px;
    margin-top: 10px;
    color: white;
    padding: 15px;
    margin-left: -10px;
    text-align: center;
}
.item-left {
    background-color: #99cc33;
}
.item-left:active {
    background-color: #b4e257;
    box-shadow: 2px 2px 10px #000;
}

.item-right {
    background-color: #33cc99
}
.item-right:active {
    background-color: #55dbae;
    box-shadow: 2px 2px 10px #000;
}

</style>