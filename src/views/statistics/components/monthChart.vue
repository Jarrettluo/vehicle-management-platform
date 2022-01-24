<template>
<!--    <v-chart :options="option"/>-->
    <div id="myChart3" :style="{width: '400px', height: '300px'}"></div>
</template>

<script>
// import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'       //绘制不同的图表要引入不同的chart和component
// import 'echarts/lib/component/bar'

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
    mounted(){
        this.drawLine();
    },
    methods: {
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
            let option = {
                grid: {
                    top: 10
                },
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
                    dataIndex: dataIndex
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