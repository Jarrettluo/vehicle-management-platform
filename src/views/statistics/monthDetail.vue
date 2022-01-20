<template>
    <div>
        <div>
            <mt-header title="销售统计报表">
                <router-link to="/homepage" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
                <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
            </mt-header>
        </div>
        <div style="margin: 6px 0; display: flex;text-align: center;flex-wrap: wrap; justify-content: space-between;padding: 6px 0px;">
            <div style="width: 25%; border-right: 1px solid #eaeaea;font-size: 0.6rem;">
                <div>⬅️</div>
                <div>上一月</div>
            </div>
            <div style="line-height: 36px;font-size: 1.1rem; color: #3d4049;">
                2022年1月
            </div>
            <div style="width: 25%; border-left: 1px solid #eaeaea; font-size: 0.6rem;">
                <div>👉</div>
                <div>下一月</div>
            </div>
        </div>

        <div style="display: flex;flex-wrap: wrap; justify-content: space-between;text-align: center; font-size: 1rem;height: 36px;border-bottom: 2px solid #fff;line-height: 36px;">
            <div style="width: 25%;background-color: lightcoral;color: white;font-weight: bold;">本月总购车</div>
            <div style="width: 25%;text-align: left;padding: 0 4px; color: lightcoral;">125辆</div>
            <div style="width: 25%;background-color: yellowgreen;color: white;font-weight: bold;">本月总售车</div>
            <div style="width: 25%;text-align: left;padding: 0 4px;color: #1c7430;">125辆</div>
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; text-align: center; font-size: 1rem;height: 36px;line-height: 36px;">
            <div style="width: 25%;background-color: lightcoral;color: white;font-weight: bold;">本月总支出</div>
            <div style="width: 25%;text-align: left;padding: 0 4px; color: lightcoral;">1,200,000</div>
            <div style="width: 25%;background-color: yellowgreen;color: white;font-weight: bold;">本月总收入</div>
            <div style="width: 25%;text-align: left;padding: 0 4px; color: #1c7430;">1,234,898</div>
        </div>
        <div>

        </div>
        <div style="padding: 10px 0px 0px 0px;">
            排序
        </div>
        <div class="vehicle-item-group" v-for="vehicle in vehicleMonth" :key="vehicle.id">
            <VehicleItem :vehicle-info="vehicle"></VehicleItem>
        </div>
<!--        <div>-->
<!--            下载-->
<!--        </div>-->
    </div>
</template>

<script>
import "../../assets/css/font-awesome.css"
import VehicleItem from "./components/vehicleItem"
export default {
    name: "monthDetail.vue",
    data(){
        return {
            vehicleMonth: [{
                id: 1,
                plate: "川A99098",
                model: "宝马312",
                income: 378700,
                outcome: 360000,
                profit: 8933.3,
            },{
                id: 2,
                plate: "川A525LC",
                model: "宝马525",
                income: 378700,
                outcome: 360000,
                profit: 9233,
            },{
                id: 3,
                plate: "川A94344",
                model: "长城H8",
                income: 378700,
                outcome: 360000,
                profit: 10003.1,
            },{
                id: 4,
                plate: "川A8K893",
                model: "奔驰GLC",
                income: 378700,
                outcome: 360000,
                profit: 12933,
            }]
        }
    },
    components: {
        VehicleItem
    }
}
</script>

<style scoped>
.vehicle-item-group {

}


</style>