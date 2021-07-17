<template>
    <div>
        <mt-header title="公司信息">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>
        <mt-cell :title="companyVO.companyName">
        </mt-cell>
        <mt-cell title="失效时间" >
            <span style="color: green">{{companyVO.expirationTime}}</span>
        </mt-cell>
        <mt-cell title="账号数量">
            <span style="">{{ companyVO.validAccount }}</span>
        </mt-cell>
        <div class="information-panel">
            <div><p>说明信息</p></div>
            <div>
                <p>- 失效时间是该公司的账号失效时间。</p>
                <p>- 失效以后的账号可以进行充值增加。</p>
                <p>- 失效后可联系网站运营方。</p>
            </div>
        </div>
        <div style="width:100%;padding: 5px 10px;">
           <mt-button type="primary" style="width:100%;" @click="alterInfo">充  值</mt-button> 
           <!-- <mt-button type="danger" style="width:100%;">充值</mt-button> -->
        </div>
    </div>
</template>

<script>

import companyRequest from "../../../request/requests/system"
import { MessageBox } from "mint-ui"
export default {
    data() {
        return {
            companyVO: {}
        }
    },
    mounted() {
        this.getCompanyInfo()
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        /**
         * @description 得到公司信息
         * @author ljr
         * @since 2021年7月8日
         */
        async getCompanyInfo(){
            let param = {
                companyId: sessionStorage.getItem("companyId"),
            }
            await companyRequest.findCompanyRequest(param)
                .then(res => {
                    if(res.code == 200) {
                        this.companyVO = res.data
                        return
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        alterInfo(){
            MessageBox('提示', '请联系樱桃智库150-0820-1329');
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

    .information-panel {
        padding:10px;
        border-radius:10px;
        background-color:#fafafa;
        margin:16px 5px 20px 5px;
        border: 1px solid #f1f1f1;
    }

    .information-panel p {
        font-size:12px;
        margin-bottom:4px;
    }
</style>