<template>
	<div class="login-container">
		<div class="login">
			<h1>欢迎登录</h1>
			<p>二手车管理系统</p>
			<br>	
		  <div class="page-part">
			<mt-field placeholder="输入手机号" type="tel" ><label align="left"><i class="fa fa-mobile" aria-hidden="true"></i></label></mt-field>
			<mt-field placeholder="密码" type="password" ><i class="fa fa-unlock-alt" aria-hidden="true"></i></mt-field>
		  </div>
			<div style="margin-top: 40px;">
			  <mt-button type="primary" @click="login" class="login_style">
				  <label style="margin-top:8px;">登录</label>
			  </mt-button>
			</div>
		 </div>
		 <div style="text-align: center;margin-top: 16rem;">
			 <span style="color: #2C3E50;font-size: smaller;">成都樱桃智库技术有限公司提供服务</span>
		 </div>
	</div>
	
</template>

<script>
	export default {
		name: "Login",
		data(){
		  return {
			name: '',
			pwd : '',
			error : {
			  name: '',
			  pwd : ''
			}
		  }
		},
		methods:{
		  login(){
			const { name, pwd, $router} = this
			this.$router.push({
			  name: "Main",
			  params: {
				username: this.name
			  }
			});
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
