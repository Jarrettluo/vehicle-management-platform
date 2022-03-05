<template>
    <div class="page-container">
        <div class="vin-res-page-title">
            <span>识别车辆信息</span>
        </div>
        <div class="page-body-res">
            <mt-cell v-for="(renderItem, index) in renderList "
                     :key="index" :title="renderItem.keyDesc"
                     :value="vinRecogniazeResult[renderItem.keyName]">
<!--                <i slot="icon" class="fa fa-copyright" aria-hidden="true"></i>-->
                <i slot="icon" :class=renderItem.icon></i>
            </mt-cell>
        </div>
        <div class="page-footer">
            <mt-button type="default" size="small" @click="recognizeAgain"><label style="margin-top:8px;">重新识别</label></mt-button>
            <mt-button type="default" size="small" @click="cancelResult"><label style="margin-top:8px;">取消识别</label></mt-button>
            <mt-button type="primary" size="small" @click="confirmResult"><label style="margin-top:8px;">确认结果</label></mt-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "vinRecogRes.vue",
    data() {
        return {
            resData: {
                brand_name: "大众", //
                chassis_number: "A5(1K)",
                cid: "21416",
                cms: "4",
                csjg: "三厢车", //
                displacement: "1.6",
                displacement_ml: "1595",
                driven_type: "前置前驱",
                effluent_standard: "欧IV", // 排放标准
                engine_model: "",
                front_tyre_size: "205/55 R16",
                full_weight: "1379", // 整车质量
                gearbox: "6挡手自一体", // 变速箱类型
                gearbox_number: "09G/TF-60SN", // 变速箱编码
                geartype: "手自一体变速箱(AT)", // 变速箱分类
                high: "1461", //
                is_commercial: 0,
                length: "4544", //
                market_date: "2010.11", // 上市时间
                matching_mode: 1,
                name: "2011款 1.6L 自动舒适型", //
                nedczhyh: "6.7",
                price: "14.78万", // 指导价
                rear_tyre_size: "205/55 R16",
                rlxs: "汽油",  // 燃油类型
                ryxh: "92号", // 燃油牌号
                scale: "紧凑型车",
                series_name: "速腾", // 车辆型号
                stop_date: "2012.03.07", // 停产时间
                trackfront: "1539",
                trackrear: "1528",
                vin: "LFV2A21K6A3092399", //
                wheelbase: "2578",
                width: "1760", //
                year: "2011", //
                zws: "5",
            },
            renderList: [
                {
                    keyName: "vin",
                    keyDesc: "车辆编码",
                    icon: "fa fa-barcode",

                },
                {
                    keyName: "brand_name",
                    keyDesc: "车辆品牌",
                    icon: "fa fa-car"
                },
                {
                    keyName: "series_name",
                    keyDesc: "车辆系列",
                    icon: "fa fa-car"
                },
                {
                    keyName: "name",
                    keyDesc: "车型",
                    icon: "fa fa-car"
                },
                {
                    keyName: "price",
                    keyDesc: "指导价",
                    icon: "fa fa-jpy"
                },
                {
                    keyName: "year",
                    keyDesc: "车辆制造时间",
                    icon: "fa fa-calendar"
                },
                {
                    keyName: "market_date",
                    keyDesc: "车型上市时间",
                    icon: "fa fa-calendar"
                },
                {
                    keyName: "stop_date",
                    keyDesc: "车型停产时间",
                    icon: "fa fa-calendar"
                },
                {
                    keyName: "gearbox",
                    keyDesc: "变速箱类型",
                    icon: "fa fa-gears"
                },
                {
                    keyName: "gearbox_number",
                    keyDesc: "变速箱编码",
                    icon: "fa fa-gears"
                },
                {
                    keyName: "geartype",
                    keyDesc: "变速箱分类",
                    icon: "fa fa-gears"
                },
                {
                    keyName: "effluent_standard",
                    keyDesc: "排放标准",
                    icon: "fa fa-tint"
                },
                {
                    keyName: "rlxs",
                    keyDesc: "燃油类型",
                    icon: "fa fa-tint"
                },
                {
                    keyName: "ryxh",
                    keyDesc: "燃油牌号",
                    icon: "fa fa-tint"
                },

                {
                    keyName: "full_weight",
                    keyDesc: "整车质量",
                    icon: "fa fa-cube"
                },
                {
                    keyName: "length",
                    keyDesc: "长度",
                    icon: "fa fa-cube"
                },
                {
                    keyName: "width",
                    keyDesc: "宽度",
                    icon: "fa fa-cube"
                },
                {
                    keyName: "high",
                    keyDesc: "高度",
                    icon: "fa fa-cube"
                },



            ]
        }
    },
    props: ["vinRecogniazeResult"],
    methods: {
        recognizeAgain() {
            this.$emit("recognizeAgain", true)
        },
        cancelResult() {
            this.$emit("cancelResult", true)
        },
        confirmResult() {
            this.$emit("confirmResult", true)
        }
    }

}
</script>

<style scoped>
.page-container {
    height: 100%;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}
.vin-res-page-title{
    height: 40px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    color: #0062cc;
}

.page-body-res {
    height: calc( 100% - 80px);
    width: 100%;
    overflow-y: auto;
    padding-bottom: 40px;

}

.page-footer {
    height: 40px;
    width: 100%;
    overflow: hidden;
    /*line-height: 40px;*/
    display: flex;
    display: -webkit-flex; /* Safari */
    justify-content: space-around;
    padding-top: 5px;
}

.mint-button-text {
    margin: 0;
}

label /deep/ {
    margin-bottom: 0 !important;
}

</style>