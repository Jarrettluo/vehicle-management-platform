<template>
        <div>
        <mt-header title="系统日志">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>

        <ul class="log-group">
            <li v-for="(operateLog, index) in operateLogList" :key="index">
                <div class="log-item">
                    <div class="log-title">
                        <span class="log-user ">
                            {{ operateLog.userCode}}
                        </span>
                        <span class="log-time">
                            {{operateLog.operationTime | dateFormat}}
                        </span>                        
                    </div>
                    <div class="log-msg">
                        <span class="log-type">{{ operateLog.type }}</span>
                        <span class="log-model">{{ operateLog.model }}</span>
                        <span class="log-status" :class="[operateLog.result == 200 ?'log-status-success':'log-status-failed']">
                            {{operateLog.result | state}}</span>
                        <span class="log-ip">{{ operateLog.ip }}</span>                        
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
// 导入时间插件momentjs
import moment from 'moment'
import systemPage from '../../../request/requests/system'

export default {
    data(){
        return {
            operateLogList: []
        }
    },
    // 定义时间格式全局过滤器
    filters: {
        dateFormat:function (daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
            return moment(daraStr).format(pattern)
        },
        state:function (code) {
            return code == 200 ? "成功":"失败";
        }
    },
    mounted(){
        this.acquireStatistics()
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },

        /**
         * 异步获取后台的数据
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        async acquireStatistics(){
            await systemPage.logRequest()
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
                this.operateLogList = res.data.reverse(); // 翻转列表
            } else {
                Toast("获取失败，检查网络")
            }
        },


    }
}
</script>

<style scoped>
    a,
    a:hover,
    a:active,
    a:focus {
        text-decoration: none !important;
    }

    .log-item {
        padding: 5px 15px;
        /* display: flex;
        justify-content: center; */
    }

    .log-title {
        font-size: 1rem;
    }
    .log-time {
        float: right;
        color: #999;
    }

    .log-msg {
        font-size: 0.75rem;
    }

    .log-status{
        color: #fff;
        border-radius: 2px;
        padding: 1px 2px;
    }
    
    .log-status-failed {
        background-color: tomato ;
    }

    .log-status-success {
        background-color: yellowgreen;
    }

    .log-ip {
        float: right;
    }

    ul {
        list-style-type: none;   
        margin: 0;   
        padding: 0;
    }

    li {   
        font: 200 16px/1.5 Helvetica, Verdana, sans-serif;   
        border-bottom: 1px solid #ccc;   
    }   
                
    li:last-child {   
        border: none;   
    }   
                
    li a {   
        text-decoration: none;   
        color: #000;   
        display: block;   
        width: 200px;   
                    
        -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;   
        -moz-transition: font-size 0.3s ease, background-color 0.3s ease;   
        -o-transition: font-size 0.3s ease, background-color 0.3s ease;   
        -ms-transition: font-size 0.3s ease, background-color 0.3s ease;   
        transition: font-size 0.3s ease, background-color 0.3s ease;   
    }   
                
    li a:hover {   
        font-size: 30px;   
        background: #f6f6f6;   
    }  

</style>