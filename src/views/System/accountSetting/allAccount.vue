<template>
    <div>
        <mt-header title="全部账号">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>
        <div class="account-item" v-for="(account, index) in accountList" :key="index">
            <mt-cell title="登录账号">
                <span v-show="account.id == adminUser.id" style="font-size:12px;color:#fff;border-radius:4px;background-color:yellowgreen;padding:4px;">当前账号</span> 
                {{account.username}}</mt-cell>
            <mt-cell title="账号类型">
                <mt-button @click="changeUserType(account)" :disabled="account.type == 'admin' && account.id == adminUser.id " size="small">
                    <label style="margin-top:10px;">{{ account.type | roleType }}</label></mt-button>
            </mt-cell>
            <mt-cell title="是否删除">
                <mt-button type="danger" style="width:100%;" :disabled="account.type == 'admin' && account.id == adminUser.id " @click="isDeleteUser(account.id)" size="small">
                    <label style="margin-top:10px;">删  除</label></mt-button>
            </mt-cell>   
            <mt-cell title="活动日志" is-link :to="'/systemSetting/systemLog?username=' + account.username"></mt-cell>   
            <hr>     
        </div>
<!-- <span> 删  除 </span> -->
    </div>
</template>

<script>
import userRequest from "../../../request/requests/system"
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            accountList: [],
            adminUser: {},
        }
    },
    mounted() {
        this.getUserList()
    },
    filters: {
        roleType(value) {
            return value=="admin"?"管理员":"普通用户";
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        async getUserList(){
            await userRequest.userListRequest({
                companyId: sessionStorage.getItem("companyId")
            })
                .then(res => {
                    this.updateUserList(res)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 更新用户列表
        updateUserList(res){
            if(res.code == 200) {
                let allData = res.data
                this.adminUser = allData.filter(element => element.id == sessionStorage.getItem("userId"))[0]
                if(this.adminUser.type != "admin") {
                    Toast("您是普通账号，没有权限访问！")
                    this.goBack(); // 跳转回去
                }else {
                    this.accountList = allData
                }
            }else {
                console.log(res)
            }
        },
        isDeleteUser(userId) {
            MessageBox.confirm('确定删除该用户?').then(action => {
                this.deleteUser(userId)
            });
        },
        /**
         * @description 管理员删除普通用户
         * @author ljr
         * @since 2021年7月8日
         */
        async deleteUser(userId){
            if(this.adminUser.type != "admin") return
            let param = {userId: userId}
            await userRequest.deleteUserRequest(param)
                .then(res => {
                    this.updateDeleteUser(res)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 更新结果
        updateDeleteUser(res){
            if(res.code == 200 ){
                console.log(res)
                this.getUserList()
            }else {
                console.log(res)
            }
        },
        /**
         * @description 管理员修改用户权限
         * @author ljr
         * @since 2021年7月8日
         */
        async changeUserType(account){
            if(this.adminUser.type != "admin") return
            let param = {
                adminId: this.adminUser.id,
                userId: account.id
            }
            await userRequest.changeTypeRequest(param)
                .then(res => {
                    this.updateChangeUser(res)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 更新修改结果
        updateChangeUser(res){
            if(res.code == 200 ){
                this.getUserList()
            }else {
                console.log(res)
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

    #account-item {
        padding-bottom: 10px;
        background-color: green;
        margin-bottom: 15px;
    }
</style>