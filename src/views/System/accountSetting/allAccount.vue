<template>
    <div>
        <mt-header title="全部账号">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>
        <div class="account-item" v-for="(account, index) in accountList" :key="index">
            <mt-cell title="登录账号" :value=account.username></mt-cell>
            <mt-cell title="账号类型">
                <mt-button @click="changeUserType(account)" :disabled="account.type == 'admin' && account.id == adminUser.id ">{{ account.type | roleType }}</mt-button>
            </mt-cell>
            <mt-cell title="是否删除">
                <mt-button type="danger" style="width:100%;" :disabled="account.type == 'admin' && account.id == adminUser.id " @click="isDeleteUser(account.id)"><span> 删  除 </span></mt-button>
            </mt-cell>   
            <mt-cell title="活动日志" is-link ></mt-cell>   
            <hr>     
        </div>

    </div>
</template>

<script>
import userRequest from "../../../request/requests/system"
import { MessageBox } from 'mint-ui';
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
                this.accountList = res.data
                this.adminUser = this.accountList.filter(element => element.id == sessionStorage.getItem("userId"))[0]
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
                console.log(res)
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