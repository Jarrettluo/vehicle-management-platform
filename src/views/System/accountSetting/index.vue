<template>
    <div>
        <mt-header title="账号设置">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>

        <div class="cell-group">
            <div class="cell-group-item">
                <mt-button type="default" style="width: 100%" @click="logout">退出登录</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    methods: {
        goBack(){
            this.$router.go(-1);
        },
        logout() {
            window.sessionStorage.clear();
            this.goBack();
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

    .cell-group {
        padding: 10px;
    }
</style>