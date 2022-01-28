<template>
    <div id="myChart3" :style="{width: '400px', height: '300px'}"></div>
</template>

<script>

import StatisticsPageRequest from "../../../request/requests/statistics";
import {Toast} from "mint-ui";

export default {
    name: "monthChart.vue",
    components: {
    },
    data () {
        return {
            option: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            }
        }
    },
    props: ["year"],
    mounted(){
        this.getYearMonthStat();
    },
    methods: {
        async getYearMonthStat(year){
            let params = {
                year: year?year:this.year,
                companyId: sessionStorage.getItem("companyId")
            }
            await StatisticsPageRequest.statisticsMonthRequest(params)
                .then(res => {
                    if(res.code == 200){
                        this.drawLine(res.data);
                    }
                })
                .catch(err => {
                    Toast("获取失败，检查网络")
                })
        },
        drawLine(data){
            // 基于准备好的dom，初始化echarts实例
            let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
            let option = {
                grid: {
                    top: 10
                },
                xAxis: {
                    type: 'category',
                    data: data.month
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: data.stat,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.15)'
                        }
                    }
                ]
            };

            // 绘制图表
            myChart3.setOption(option);

            var that = this
            myChart3.on('click', function (params) {
                that.routerToGo(params.dataIndex)
            })

        },
        /**
         *
         * @param dataIndex
         */
        routerToGo(dataIndex){
            this.$router.push({
                path: '/statistics/month',
                query: {
                    year: this.year,
                    month: dataIndex + 1,
                }
            })
        }
    }
}
</script>

<style scoped>
.echarts {
    width: 100%;
    height: 100%;
}
</style>