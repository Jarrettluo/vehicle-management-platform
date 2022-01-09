<template>
    <div>
        <mt-header title="系统设置">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>

        <div class="cell-group">
            <div class="cell-title">
                <span><i class="fa fa-user-circle-o" aria-hidden="true"></i> 账号设置</span>
            </div>
            <div class="cell-group-item">
                <mt-cell 
                title="全部账号" 
                to="/systemSetting/allAccount"
                is-link>
                </mt-cell>
                <mt-cell 
                title="修改密码" 
                to="/systemSetting/changePassword"
                is-link>
                </mt-cell>
                <mt-cell 
                title="退出登录" 
                to="/systemSetting/accountSetting"
                is-link>
                </mt-cell>
            </div>
            <div class="cell-title">
                <span><i class="fa fa-tasks" aria-hidden="true"></i> 通用功能</span>
            </div>
            <div class="cell-group-item">
                <mt-cell
                    title="整备项目"
                    to="/systemSetting/preparatoryItem"
                    is-link>
                </mt-cell>
                <mt-cell 
                title="公司信息" 
                to="/systemSetting/companyInfo"
                is-link>
                </mt-cell>
                <mt-cell 
                title="操作日志" 
                to="/systemSetting/systemLog"
                is-link>
                </mt-cell>
            </div>
        </div>
    </div>
</template>

<script>

import { Cell } from 'mint-ui';

export default {
    methods: {
        goBack(){
            this.$router.go(-1);
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

    .cell-group {
        padding: 10px;
    }

    .cell-title {
        font-size: 1em;
        font-weight: 400;
        padding: 10px 0px 5px 10px;
        background-color: #eee;
        border-radius: 6px;
        margin: 10px 0px 5px 0px;
    }
</style>