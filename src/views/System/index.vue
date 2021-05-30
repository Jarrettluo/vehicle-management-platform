<template>
    <div>
        <mt-header title="系统设置">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>

        <div class="cell-group">
            <div class="cell-group-item">
                <mt-cell 
                title="账号设置" 
                to="/systemSetting/accountSetting"
                is-link>
                </mt-cell>
            </div>
        </div>

            <!-- <mt-cell 
            title="标题文字" 
            icon="success" 
            value="带 icon"
            to="//github.com"
            is-link></mt-cell>
        <mt-cell 
            title="标题文字" 
            icon="success" 
            value="带 icon"
            to="//github.com"
            is-link>
        </mt-cell> -->
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
</style>