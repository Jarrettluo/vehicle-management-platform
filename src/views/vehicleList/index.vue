<template>
    <div>
        <mt-header title="车辆列表">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>

        <mt-navbar v-model="selected">
            <mt-tab-item id="1">在售车辆</mt-tab-item>
            <mt-tab-item id="2">已售车辆</mt-tab-item>
        </mt-navbar>
        <br>
        <div>
            <mt-cell class="page-part" title="在售车辆总计" v-if="selected=='1'">{{ unSoldVehicle.length }}</mt-cell>
            <mt-cell class="page-part" title="已售车辆总计" v-if="selected=='2'">{{ soldVehicle.length }}</mt-cell>
        </div>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <section class="page-route-list">
                    <mt-cell v-for="(vehicle, index) in unSoldVehicle" :key="index" :title="vehicle.vehiclePlate"
                     :label="'品牌 '+vehicle.vehicleBrand" is-link :to="'/saleVehicle/?vehicleId=' + vehicle.id">
                        <mt-badge v-if="!vehicle.preparednesses.length" type="error">未整备</mt-badge>
                    </mt-cell>
                </section>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="(vehicle, index) in soldVehicle" :key="index" :title="vehicle.vehiclePlate"
                 :label="'品牌 '+vehicle.vehicleBrand" is-link :to="'/saleVehicle/?vehicleId=' + vehicle.id">
                    <mt-badge v-if="vehicle.saleItem.clearState===1" type="warning">已结</mt-badge>
                </mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import vehicleListPage from '../../request/requests/vehicleInfo.js'
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            selected:"1",
            unSoldVehicle:[],
            soldVehicle: []
        }
    },
    created(){
        this.getParams()
    },
    mounted() {
        this.getVehicleListData("unsale")
        this.getVehicleListData("saled")
    },
    destroyed(){
        sessionStorage.setItem("tabId", this.selected)
    },
    methods: {
        /**
         * 获取路由参数
         */
        getParams () {  
            var id = this.$route.query.id;
            if(id) {
                this.selected = id;
            }else{
                this.selected = sessionStorage.getItem("tabId")
            }
        },
        /**
         * 异步提交数据给后台
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        async getVehicleListData(sellState){
            let param = {
                companyId: sessionStorage.getItem("companyId"),
                sellState: sellState
            }
            await vehicleListPage.vehicleRequest('GET', {}, {}, "/list")
                .then(res => {
                    this.updateListData(res, param)
                })
                .catch(err => {
                    Toast("获取失败，检查网络" + err)
                })
        },

        /**
         * 更新结果
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        updateListData(res, param) {
            if(res.code === 200) {
                var data = res.data
                data = data.reverse() // 列表反转
                for(var i=0, len=data.length; i< len; i++){
                    if(data[i].saleitemId != null){
                        this.soldVehicle.push(data[i])
                    }else {
                        this.unSoldVehicle.push(data[i])
                    }
                }
            }else {
                Toast("获取失败，检查网络:" + res.message)
            }
        },
        jump(vehicleId){
            this.$router.push({
                path: '/vehicleRegister',
                query: {
                    vehicleId: vehicleId
                }
            })
        },

        goBack(){
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped>

  ul {
    padding: 10px 0px 5px 10px;
  }
  ul li:last-child {
    margin-bottom: 40px;
  }

  .mt-cell {
      text-align: left;
      border-bottom: 1px solid red ;
  }

a,
a:hover,
a:active,
a:focus {
    text-decoration: none !important;
}
</style>