<template>
    <div>
        <mt-header title="修改密码">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>
        
        <mt-field label="密码" placeholder="请输入旧密码" type="password" v-model="oldPwd" @input="inputOldPwd"
        :state="oldPwdState | checkIcon">
            <template >
                <span style="color:#333">{{ oldPwdMsg }}</span>
            </template>
        </mt-field>
        <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="newPwd" 
        @input="inputNewPwd"
        :state="newPwdState | checkIcon">
            <template >
                <span style="color:#333">{{ newPwdMsg }}</span>
            </template>
        </mt-field>
        <mt-field label="确认密码" placeholder="确认新密码" type="password" v-model="checkPwd" @input="inputCheckPwd"
         :state="checkPwdState | checkIcon">
            <template >
                <span style="color:#333">{{ checkPwdMsg }}</span>
            </template>
        </mt-field>
        <div style="width:100%;padding: 5px 10px;">
           <mt-button type="danger" style="width:100%;" @click="changePwd">修  改</mt-button>
        </div>
    </div>
</template>

<script>
import userRequest from "../../../request/requests/system"
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            oldPwd: null,
            newPwd: null,
            checkPwd: null,
            oldPwdState: 0,
            newPwdState: 0,
            checkPwdState: 0,
            oldPwdMsg: null,
            newPwdMsg: null,
            checkPwdMsg: null
        }
    },
    filters:{
        checkIcon(state){
            return state == 0 ? "none"
                : state == 1 ? "error"
                : state == 2 ? "success"
                : null
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        /**
         * @description 管理员修改用户权限
         * @author ljr
         * @since 2021年7月8日
         */
        async changePwd(){
            if(this.oldPwdState !=2 || this.newPwdState!=2 || this.checkPwdState !=2) return false; // 状态必须是成功的
            if(!this.oldPwd || !this.newPwd || !this.checkPwd) return false; // 判断输入值是否具有，否则直接返回
            let param = {
                userId: sessionStorage.getItem("userId"),
                oldPwd: this.oldPwd,
                newPwd: this.newPwd
            }
            await userRequest.changePwdRequest(param)
                .then(res => {
                    this.updateChangePwd(res)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 更新修改结果
        updateChangePwd(res){
            if(res.code == 200 ){
                Toast({
                    message: '修改密码成功！',
                    position: 'bottom',
                    duration: 2000
                });
                this.$router.push({
                    path: '/loginPage',
                })
            }else {
                Toast({
                    message: '修改失败：' + res.message,
                    position: 'bottom',
                    duration: 2000
                });
            }
        },
        inputOldPwd(e) {
            let reg = /^[\dA-Za-z_]{6,14}$/;
            if(e.length == 0){
                this.oldPwdMsg = '请输入密码';
                this.oldPwdState = 1
                return false;
            }else if(!reg.test(e)){
                this.oldPwdMsg = '请输入正确的密码';
                this.oldPwdState = 1
                return false;
            }else{
                this.oldPwdMsg = '';
                this.oldPwdState = 2
            }
        },
        inputNewPwd(e){
            let reg = /^[\dA-Za-z_]{6,14}$/;
            if(e.length == 0){
                this.newPwdMsg = '请输入密码';
                this.newPwdState = 1
                return false;
            }else if(!reg.test(e)){
                this.newPwdMsg = '请输入正确的密码';
                this.newPwdState = 1
                return false;
            }else{
                this.newPwdMsg = '';
                this.newPwdState = 2
            }
        },
        inputCheckPwd(e) {
            if(e.length == 0) {
                this.checkPwdMsg = '请输入密码';
                this.checkPwdState = 1
                return false;
            }else if(e != this.newPwd){
                this.checkPwdMsg = '密码不相同';
                this.checkPwdState = 1
                return false;
            }else {
                if(this.newPwdState == 2){
                    this.checkPwdMsg = null
                    this.checkPwdState = 2
                }else {
                    this.checkPwdMsg = '请输入正确的密码';
                    this.checkPwdState = 1
                    return false;
                }

            }
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
</style>