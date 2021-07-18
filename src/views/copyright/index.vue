<template>
    <div style="height:100vh; background-color:#fff">
        <div class="header-page">
            <div class="reback">
                <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            </div>
        </div>
        <div class="logo-page">
            <img src="@/assets/copyright/icon.png" alt="" width="64px">
        </div>
        <div class="info-page">
            <div class="title">
                车管家 <small>v1.0.0</small>
            </div>
            <div><i class="fa fa-copyright" aria-hidden="true"></i>成都樱桃智库科技有限公司</div>
            <div><i class="fa fa-phone-square" aria-hidden="true"></i> +86 150-0820-1329</div>
        </div>
    </div>
</template>

<script>
import "../../assets/css/font-awesome.css"
export default {
    methods: {
        /**
         * 返回的选项
         * @author 罗佳瑞
         * @since 2021年1月19日
         */
        goBack(){
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped>
.header-page {
    min-height: 410px;
    background-size:100% 100%;
    -moz-background-size: 100% 100%;
    background: url('./background.jpg') 0 0 repeat;
}

.reback {
    padding: 10px;
}
.logo-page {
    text-align: center;
    margin-top: 30px;
}

.info-page {
    color: rgb(145, 143, 143);
    text-align: center;
    font-size: 14px;
}

.info-page .title {
    color: #568eff;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 30px;
}

a,
a:hover,
a:active,
a:focus {
    color: #fff;
    text-decoration: none !important;
}
</style>