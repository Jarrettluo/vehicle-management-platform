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