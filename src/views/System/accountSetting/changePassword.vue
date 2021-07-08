<template>
    <div>
        <mt-header title="修改密码">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>
        
        <mt-field label="密码" placeholder="请输入旧密码" type="password" v-model="oldPwd"></mt-field>
        <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="newPwd"></mt-field>
        <mt-field label="确认密码" placeholder="确认新密码" type="password" v-model="checkPwd"></mt-field>
        <div style="width:100%;padding: 5px 10px;">

           <!-- <mt-button type="default" style="width:100%;">修改</mt-button>  -->
           <mt-button type="danger" style="width:100%;">修  改</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            oldPwd: null,
            newPwd: null,
            checkPwd: null
        }
    },
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
</style>