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
        <div class="vehicle-item-group" >
            <VehicleItem></VehicleItem>
            <VehicleItem></VehicleItem>
            <VehicleItem></VehicleItem>
            <VehicleItem></VehicleItem>

        </div>
        <div>
            下载
        </div>
    </div>
</template>

<script>
import "../../assets/css/font-awesome.css"
import VehicleItem from "./components/vehicleItem"
export default {
    name: "monthDetail.vue",
    data(){
        return {

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