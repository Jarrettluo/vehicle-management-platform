<template>
    <div>
        <copyrightPage/>
        <br>
        <br>
        <br>
        <br>
        <div class="title">
            <span>现在试用</span>
        </div>
        <div class="container">
            <div class="item">
                <mt-field label="公司名称" placeholder="请输入公司名称（20字以内）" v-model="companyName"
                @input="inputCompanyName"
                :state="companyNameState | checkIcon"></mt-field>
            <mt-field label="公司简称" placeholder="公司简称2-4字" v-model="abbreviation"
                @input="inputAbbreviation"
                :state="abbreviationState | checkIcon"></mt-field>

            </div>
            <div class="item">
                <mt-field label="主账号" placeholder="请输入手机号" type="tel" v-model="username"
                @input="inputUsername"
                :state="usernameState | checkIcon"></mt-field>
                <mt-field label="主账号密码" placeholder="登录密码（字母数字）" type="password" v-model="password"
                @input="inputNewPwd"
                :state="passwordState | checkIcon">
                </mt-field>
                <mt-field label="确认密码" placeholder="确认密码（6-14位）" type="password" v-model="checkPassword"
                @input="inputCheckPwd"
                :state="checkPasswordState | checkIcon"></mt-field>           
            </div>
            <div class="item">
                <mt-field label="有效账号数" placeholder="Input number" type="number" v-model="validAccount" disabled></mt-field>
                <mt-field label="账号有效期" placeholder="Input birthday" type="date" v-model="expirationTime" disabled></mt-field>
            </div>
            <mt-button plain type="primary" style="width: 100%;margin:10px 0px;" @click="checkSubmit">确认提交</mt-button>
            <br>
            <br>
            <br>
            <br>
        </div>
    </div>
</template>

<script>
import copyrightPage from "../copyright/index.vue"
import { formatDate } from "../../plugin/utils"
import tryoutPage from ".././../request/requests/tryout"

export default {

    data(){
        return {
            companyName: null,
            abbreviation: null,
            username: null,
            password: null,
            checkPassword: null,
            validAccount: 2,

            companyNameState: 0,
            abbreviationState: 0,
            usernameState: 0,
            passwordState: 0,
            checkPasswordState: 0,

        }
    },
    computed: {
        expirationTime() {
            let dateTime = new Date();
            dateTime=dateTime.setMonth(dateTime.getMonth()+1);
            dateTime=new Date(dateTime);
            return formatDate(dateTime, "yyyy-MM-dd")
        }
    },
    components: {
        copyrightPage
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
        inputCompanyName(e) {
            let reg = /[\u4e00-\u9fa5a-zA-Z0-9\-]{2,20}/; // 公司名称
            if(e.length == 0 || e.length > 20){
                this.companyNameState = 1
                return false;
            }else if(!reg.test(e)){
                this.companyNameState = 1
                return false;
            }else{
                this.companyNameState = 2
            }
        },
        inputAbbreviation(e) {
            let reg = /[\u4e00-\u9fa5a-zA-Z0-9\-]{2,5}/; // 公司名称
            if(e.length == 0 || e.length > 4){
                this.abbreviationState = 1
                return false;
            }else if(!reg.test(e)){
                this.abbreviationState = 1
                return false;
            }else{
                this.abbreviationState = 2
            }

        },
        inputUsername(e) {
            let reg = /^1(3|4|5|7|8)\d{9}$/
            if(e.length == 0){
                this.usernameState = 1
                return false;
            }else if(!reg.test(e)){
                this.usernameState = 1
                return false;
            }else{
                this.usernameState = 2
            }

        },
        inputNewPwd(e){
            let reg = /^[\dA-Za-z_]{6,14}$/;
            if(e.length == 0){
                this.passwordState = 1
                return false;
            }else if(!reg.test(e)){
                this.passwordState = 1
                return false;
            }else{
                this.passwordState = 2
            }
        },
        inputCheckPwd(e) {
            if(e.length == 0) {
                this.checkPasswordState = 1
                return false;
            }else if(e != this.password){
                this.checkPasswordState = 1
                return false;
            }else {
                if(this.passwordState == 2){
                    this.checkPasswordState = 2
                }else {
                    this.checkPasswordState = 1
                    return false;
                }

            }
        },
        checkSubmit(){
            if(this.companyNameState !=2 || this.abbreviationState!=2 || this.usernameState !=2 
            || this.passwordState !=2 || this.checkPasswordState !=2) return false; // 状态必须是成功的
            if(!this.companyName || !this.abbreviation || !this.username ||
             !this.password || !this.validAccount || !this.expirationTime ) return false; // 判断输入值是否具有，否则直接返回
            let param = {
                companyName: this.companyName,
                abbreviation: this.abbreviation,
                username: this.username,
                password: this.password,
                validAccount: this.validAccount,
                expirationTime: this.expirationTime
            }
            this.changePwd(param)
        },
         /**
         * @description 管理员修改用户权限
         * @author ljr
         * @since 2021年7月8日
         */
        async changePwd(param){
            await tryoutPage.addCompany(param)
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
                    message: '添加公司成功，跳转登录',
                    position: 'bottom',
                    duration: 2000
                });
                this.$router.push({
                    path: '/loginPage',
                })
            }else {
                Toast({
                    message: '添加成功：' + res.message,
                    position: 'bottom',
                    duration: 2000
                });
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
  .container {
      /* background-color: #f1f2f3; */
      /* padding: 0px; */
  }
  .title {
      margin: auto;
      color: royalblue;
      text-align: center;
      margin-bottom: 10px;
  }
  .title span {
      font-size: 18px;
      font-weight: 800;
  }
  .item {
      padding: 5px 0px;
      margin-bottom: 5px;
  }
</style>