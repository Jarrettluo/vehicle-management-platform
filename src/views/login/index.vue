<template>
	<div class="login-container">
		<div class="login">
			<h1>欢迎登录</h1>
			<p>二手车管理系统</p>
			<br>	
		  <div class="page-part">
			<mt-field placeholder="输入手机号" type="tel" v-model="username"><label align="left"><i class="fa fa-mobile" aria-hidden="true"></i></label></mt-field>
			<mt-field placeholder="密码" type="password" v-model="password"><i class="fa fa-unlock-alt" aria-hidden="true"></i></mt-field>
		  </div>
			<div style="margin-top: 40px;">
			  <mt-button type="primary" @click="login" class="login_style">
				  <label style="margin-top:8px;" @click="login">登录</label>
			  </mt-button>
			</div>
		 </div>
		 <div style="text-align: center;margin-top: 16rem;">
			 <span style="color: #2C3E50;font-size: smaller;">成都樱桃智库技术有限公司提供服务</span>
			 <!-- <div style="color: royalblue;font-size: smaller;" @click="routeGo()"></div>
			  -->
			  <br>
			  <router-link
				to="/tryout/">
				<span style="color: royalblue;font-size:12px;">申请试用</span>
			  </router-link>
		 </div>
	</div>
	
</template>

<script>
	import loginPageRequest from "../../request/requests/loginPage"
	import { Toast } from 'mint-ui';
	import { formatDate } from "../../plugin/utils"

	export default {
		name: "Login",
		data(){
		  return {
			name: '',
			pwd : '',
			error : {
			  name: '',
			  pwd : ''
			},
			username:"",
			password:"",
		  }
		},
		methods:{
			async login(){
				// const { name, pwd, $router} = this
				// this.$router.push({
				//   name: "Main",
				//   params: {
				// 	username: this.name
				//   }
				// });
				let data = {
					username: this.username,
					password: this.password
				}
				await loginPageRequest.loginRequest(data)
					.then(res => {
						this.updateLoginResult(res)
					})
					.catch(err => {
						Toast({
							message: '登录失败',
							position: 'bottom',
							duration: 5000
						});
					})
			},
			updateLoginResult(res){
				if(res.code == 200){
					sessionStorage.setItem("token", res.data.token);
					sessionStorage.setItem("userId", res.data.userId);
					sessionStorage.setItem("username", res.data.username);
					sessionStorage.setItem("expirationTime", res.data.expirationTime)
					sessionStorage.setItem("companyName", res.data.companyName)
					sessionStorage.setItem("companyAbbreviation", res.data.companyAbbreviation)
					sessionStorage.setItem("companyId", res.data.companyId)
					let expirationTime = sessionStorage.getItem("expirationTime")
					var futureTime = new Date(expirationTime);
					if(futureTime < new Date()) {
						Toast({
							message: '您的账号已经于'+ formatDate(futureTime, "yyyy-MM-dd hh:mm:ss") +'失效！请更换账号！',
							position: 'bottom',
							duration: 2000
						});
					}else {
						Toast({
							message: '欢迎您, ' + res.data.companyName + "!",
							position: 'bottom',
							duration: 5000
							});
						this.$router.push({
							path: "/homepage"
						})
					}
				}else if(res.code == 1201) {
					Toast({
						message: '登录失败,用户不存在',
						position: 'bottom',
						duration: 5000
					});
				}else if(res.code == 1202) {
					Toast({
						message: '登录失败,密码错误',
						position: 'bottom',
						duration: 5000
					});
				}else if(res.code == 1203) {
					Toast({
						message: '登录失败,' + res.message,
						position: 'bottom',
						duration: 5000
					});
				}else {
					Toast({
						message: '登录失败,未知错误',
						position: 'bottom',
						duration: 5000
					});
				}
		  	},
			routeGo(){
				this.$router.push({
					path: "/tryout"
				}).catch(err => {})

			}
		}
	  }
</script>

<style>
	.login-container {
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
		padding: 40px;
	}
  .login{
    margin-top: 40px;
  }
  .input_style{
    width: 100%;
    margin-bottom: 10px;
  }
  .login_style{
    width: 100%;
  }
  .mint-cell-wrapper {

  }
  
  a,
  a:hover,
  a:active,
  a:focus {
      text-decoration: none !important;
  }
</style>
