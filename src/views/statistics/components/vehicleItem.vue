<template>
    <div class="vehicle-item">
        <div class="item" >
            <div class="vehicle-plate">
                {{vehicleInfo.plate}}
            </div>
            <div class="vehicle-model" >
                {{vehicleInfo.model}}
            </div>
        </div>
        <div class="item center-item">
            <div class="item-info" >
                <span class="tag income-tag">支</span>
                {{vehicleInfo.outcome}}
            </div>
            <div class="item-info" v-if="vehicleInfo.income != null ">
                <span class="tag outcome-tag" >收</span>
                {{vehicleInfo.income}}
            </div>
        </div>
        <div class="item center-item" >
            <div style="width: calc(100% - 20px); float: left;" :class="vehicleInfo.profit > 0 ? 'pasitive-value' : 'negitive-value'">
                <div class="title item-info" >
                    {{vehicleInfo.profit}}
                </div>
                <div class="title item-info">
                    {{ vehicleInfo | profitPercent }}%
                </div>
            </div>
            <div class="expand-button" @click="jump2Detail(vehicleInfo.pId)">
                <i class="fa fa-caret-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "vehicleItem",
    props: ["vehicleInfo"],
    data() {
        return {

        }
    },
    filters: {
        profitPercent(vehicleInfo){
            return (vehicleInfo.profit/vehicleInfo.outcome).toFixed(2);
        }
    },
    methods: {
        linkToUnsale() {
            this.$router.push({
                path: '/vehicleList',
                query: {
                    id: "1",
                }
            })
        },
        /**
         * 路由跳转到详情页面
         * @param id
         */
        jump2Detail(id){
            this.$router.push({
                path: '/saleVehicle/',
                query: {
                    vehicleId: id
                }
            })
        }
    }


}
</script>

<style scoped>

.vehicle-item {
    color: #475056;
    font-weight: 400;
    font-size: 12px;
    border-bottom: 1px solid #f1f2f3;
    height: 60px;
    width: 100%;
    display: flex;
}

.item {
    width: 33%;
    padding: 10px;
}

.vehicle-plate {
    font-size: 14px;
    line-height: 24px;
    font-weight: 430;
    color: #0062cc;
    display:table-cell;
    vertical-align:bottom;
}

.vehicle-model {
    font-size: 10px;
    line-height: 16px;
}

.center-item {
    text-align: center;
}

.item-info {
    line-height: 20px;
}

.tag {
    padding: 0px 2px;
    border-radius: 4px;
    color: #f1f3f4;
    font-size: 10px;
    line-height: 20px;
}

.income-tag{
    background-color: #ffbbb1;
}
.outcome-tag {
    background-color: #afccff;
}

.expand-button {
    float: right;
    width: 20px;
    line-height: 40px;
    text-align: center;
    color: #999999;
}

.expand-button:active {
    color: deepskyblue;
}
.pasitive-value {
    color: red;
}

.negitive-value {
    color: green;
}
</style>