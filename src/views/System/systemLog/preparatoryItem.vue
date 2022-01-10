<template>
    <div>
        <mt-header title="整备项目">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>

<!--        <mt-cell-swipe-->
<!--            title="text"-->
<!--            :right="[-->
<!--                {-->
<!--                  content: '删除',-->
<!--                  style: { background: 'red', color: '#fff' },-->
<!--                  handler: () => this.$messagebox('删除')-->
<!--                }-->
<!--              ]"></mt-cell-swipe>-->


        <div class="log-group">
            <div class="mintui" style="font-weight:300; line-height:48px; background-color: #f1f3f4; padding: 0 10px;"><span>默认项目</span></div>
<!--            <mt-cell-swipe-->
<!--                icon="sucess"-->
<!--                :title= operateLog.name-->
<!--                :right="[-->
<!--                        {-->
<!--                          content: '删除',-->
<!--                          style: { background: 'red', color: '#fff' },-->
<!--                          handler: () => this.$messagebox('删除')-->
<!--                        }-->
<!--                        ]"-->
<!--                v-for="(operateLog, index) in operateLogList" :key="index"-->
<!--            ></mt-cell-swipe>-->
            <mt-cell v-for="(operateLog, index) in operateLogList"
                     :key="index"
                        :title="operateLog.name">
            </mt-cell>
        </div>

        <div class="log-group">
            <div class="mintui" style="font-weight:100; line-height: 48px;background-color: #f1f3f4;padding: 0 10px;">
                <span>自建项目(左滑可删除)</span>
            </div>

            <mt-cell-swipe
                icon="sucess"
                :title= operateLog.name
                :right="[
                        {
                          content: '删除',
                          style: { background: 'red', color: '#fff' },
                          handler: () => this.$messagebox('删除')
                        }
                        ]"
                v-for="(operateLog, index) in operateLogList" :key="index"
            ></mt-cell-swipe>
            <div style="padding: 8px 10px;width: 100%;">
<!--                <div class="mintui" style="border: 1px solid #cacaca;border-radius: 4px;line-height: 48px;text-align: center">-->
<!--                    <span>添加项目</span>-->
<!--                </div>-->
                <mt-button type="primary" plain style="width: 100%;" @click="addNewItem">
                    <i class="fa fa-angle-double-down" style="font-size: 28px;"></i>
                </mt-button>
                </div>
        </div>

<!--                <div class="log-item">-->
<!--                    <div class="log-title">-->
<!--                        <span class="log-user ">-->
<!--                            {{ operateLog.userCode}}-->
<!--                        </span>-->
<!--                        <span class="log-time">-->
<!--                            {{operateLog.operationTime | dateFormat}}-->
<!--                        </span>-->
<!--                    </div>-->
<!--                    <div class="log-msg">-->
<!--                        <span class="log-type">{{ operateLog.type }}</span>-->
<!--                        <span class="log-model">{{ operateLog.model }}</span>-->
<!--                        <span class="log-status" :class="[operateLog.result == 200 ?'log-status-success':'log-status-failed']">-->
<!--                            {{operateLog.result | state}}</span>-->
<!--                        <span class="log-ip">{{ operateLog.ip }}</span>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </li>-->
<!--        </div>-->
    </div>
</template>

<script>
// 导入时间插件momentjs
import moment from 'moment'
import preparatoryItemRequest from '../../../request/requests/system'
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';


export default {
    data(){
        return {
            operateLogList: [],
            usernameList: [],
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
    created(){
        this.getParams()
    },
    mounted(){
        this.acquireStatistics()
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        /**
         * 获取路由参数
         */
        getParams () {
            var username = this.$route.query.username;
            if(username) {
                this.usernameList.push(username);
            }
        },

        /**
         * 异步获取后台的数据
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        async acquireStatistics(){
            let params = {
                companyId: sessionStorage.getItem("companyId")
            }
            await preparatoryItemRequest.allPreparatoryItem(params)
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
                res.data = [{
                    name: "洗车",
                    type: "default",
                },{
                    name: "洗车",
                    type: "default",
                },{
                    name: "洗车",
                    type: "default",
                },{
                    name: "洗车",
                    type: "default",
                }]
                this.operateLogList = res.data; // 翻转列表
            } else {
                Toast("获取失败，检查网络")
            }
        },

        /**
         * 添加新项目
         */
        addNewItem(){
            MessageBox.prompt('Please tell me your name').then(({ value, action }) => {
                console.log(value)
            });
        }

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