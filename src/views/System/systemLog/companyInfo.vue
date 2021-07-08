<template>
    <div>
        <mt-header title="公司信息">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>
        <mt-cell title="成都万达鑫">
        </mt-cell>
        <mt-cell title="失效时间" >
            <span style="color: green">2021年10月30日</span>
        </mt-cell>
        <mt-cell title="账号数量">
            <span style="">2</span>
        </mt-cell>
        <div class="information-panel">
            <div><p>说明信息</p></div>
            <div>
                <p>- 失效时间是指系统</p>
                <p>- 销售提成的基数是售车价减去购车价再减去整备费用。</p>
                <p>- 销售提成金额优先，输入提成金额会自动计算销售提成。</p>
            </div>
        </div>
        <div style="width:100%;padding: 5px 10px;">
           <mt-button type="primary" style="width:100%;">充  值</mt-button> 
           <!-- <mt-button type="danger" style="width:100%;">充值</mt-button> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

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