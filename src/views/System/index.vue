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
                <span>账号设置</span>
            </div>
            <div class="cell-group-item">
                <mt-cell 
                title="账号设置" 
                to="/systemSetting/accountSetting"
                is-link>
                </mt-cell>
                <!-- <mt-cell 
                title="修改密码" 
                to="/systemSetting/accountSetting"
                is-link>
                </mt-cell> -->
            </div>
            <div class="cell-title">
                <span>通用功能</span>
            </div>
            <div class="cell-group-item">
                <mt-cell 
                title="查看日志" 
                to="/systemSetting/systemLog"
                is-link>
                </mt-cell>
                <!-- <mt-cell 
                title="修改密码" 
                to="/systemSetting/accountSetting"
                is-link>
                </mt-cell> -->
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