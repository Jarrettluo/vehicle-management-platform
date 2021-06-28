<template>
    <div style="padding: 20px 10px 0px 10px">
        <div v-for='(item,index) in itemcount' :key="index" :id="'myid'+index" :v-model="partners[index]">
            <mt-field label="出资人" placeholder="请输入出资人姓名" type="text" v-model="partners[index].name"
            :attr="{ maxlength: 10 }"></mt-field>
            <mt-field label="出资金额" placeholder="请输入出资金额（元）" type="number" v-model="partners[index].price"
            :attr="{ min: 0, max: 10000000 }"></mt-field>
            <hr>
        </div>
        <mt-button style="width: 100%;" @click="addItem">
            <label style="margin-top:8px;">
                <i class="fa fa-plus-square-o" aria-hidden="true"></i> 增加出资人
            </label>
        </mt-button>
        <div style="margin-top: 10px;" v-if="vehicleId">
            <mt-button style="width: 100%" type="danger" @click="modifyPartners">
            <label class="mint-button-text" style="margin-top:8px;"><i class="fa fa-wrench" aria-hidden="true"></i> 修改</label>
            </mt-button>
        </div>
        <div style="margin-top: 10px;">
            <mt-button style="width: 100%" type="primary" @click="backToVehicleInfo">
            <label class="mint-button-text" style="margin-top:8px;">关闭</label>
        </mt-button>
        </div>
        <div class="information-panel">
            <div><p>说明信息</p></div>
            <div>
                <p>- 仅需要填写非本公司投入的金额。</p>
                <p>- 可以对已经入库的车辆修改投资人信息。</p>
                <p>- 投资人的总金额不能大于购车费用。</p>
                <p>- 点击增加出资人按钮可以增加项目。</p>
                <p>- 清空投资人的信息可以删除掉某个投资人。</p>
            </div>
        </div>
    </div>
</template>

<script>

import partnerPageRequest from '../../request/requests/vehicleInfo.js'
import { Toast, Indicator } from 'mint-ui';

export default {
    data(){
        return {
            vehicleId: null,
            itemcount: 1,
            partners:[{
                name: null,
                price: null,
            }
            ],
        }
    },

    created() {
        this.getParams()
    },
    mounted() {
        this.judgeParams()
    },
    watch: {
        '$route': 'getParams'
    },
    methods: {
        /**
         * 获取路由参数，如果路由参数具有车辆的id，那说明是具有信息的
         * @author: 罗佳瑞
         * @since: 2021年1月31日
         */
        getParams () {  
            this.vehicleId = this.$route.query.vehicleId
        },

        /**
         * 根据是否有参数值来触发行为
         * 主要功能是从父组件中获取其合资人信息，获得vehicleInfo
         * @author: 罗佳瑞
         * @since: 2021年1月21日
         */
        judgeParams() {
            if(this.vehicleId != null){
                setTimeout(() => {
                    let vehicleInfo = this.$parent.vehicleInfo;
                    if(vehicleInfo.partners.length>0){
                        this.partners = vehicleInfo.partners
                        this.itemcount = this.partners.length;
                    }
                }, 500);
            }
        },

        /**
         * 用户点击增加投资人的按钮后出现的方法
         * @author: 罗佳瑞
         * @since: 2021年1月31日
         */
        addItem () {
            let lastPartner = this.partners[this.partners.length -1]
            if(lastPartner.name && lastPartner.price){
               this.itemcount += 1;
                this.partners.push(
                    {
                        name: null,
                        price: null,
                    }
                )
            }
        },

        /**
         * 新提交合资人的方法，这个方法主要是被父组件调用
         * @author: 罗佳瑞
         * @since: 2021年1月31日
         */
        newPostPartner(){
            this.vehicleId = this.$parent.vehicleInfo.id
            var partnerData = []
            for(var i=0, len=this.partners.length; i<len;i++){
                if(this.partners[i].name && this.partners[i].price){
                    partnerData.push({
                        name: this.partners[i].name,
                        price: this.partners[i].price,
                        vehicleId: this.vehicleId
                    })
                }
            }
            if(partnerData.length>0){
                this.postPartners(partnerData) // 提交合资人信息
            }
        },



        /**
         * 异步提交数据给后台
         * @author: 罗佳瑞
         * @since: 2021年1月31日
         */
        async postPartners(partnerData){
            await partnerPageRequest.partnerRequest('POST', {}, partnerData, "")
                .then(res => {
                    this.postPartnersResult(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },

        /**
         * 提交数据到后台以后的返回结果
         * @author: 罗佳瑞
         * @since: 2021年1月31日
         */
        postPartnersResult(res) {
            if(res.code != 200){
                Toast({
                        message: '合资人信息保存出错:'+res.message,
                    });
            }else {
                Toast({
                    message: '修改成功',
                });
            }
        },


        /**
         * PUT数据到后台
         * @author: 罗佳瑞
         * @since: 2021年1月31日
         */
        async deletePartners(){
            await partnerPageRequest.partnerRequest('DELETE', {}, {}, "/"+this.vehicleId)
                .then(res => {
                    this.putPartnersResult(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },

        /**
         * 更新数据的结果返回的方法
         * @author: 罗佳瑞
         * @since： 2021年1月31日
         */
        putPartnersResult(res) {
            if(res.code != 200){
                Toast({
                    message: '合资人信息保存出错',
                });
            }else {
                // 然后再新提交！
                this.newPostPartner()
            }
        },


        /**
         * @abstract: 修改合资人的信息
         * @author: 罗佳瑞
         * @since: 2020年1月27日
         */
        modifyPartners(){
            if(this.vehicleId){
                // 在这里引入提交的内容
                this.deletePartners() // 删除合伙人信息
                // this.saveIndicator()
            }
        },

        /**
         * 点击关闭以后触发的路由导航
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        backToVehicleInfo(){
            this.$parent.popupPartner();
        },

        /**
         * 修改指示
         * @author: 罗佳瑞
         * @since： 2021年1月31日
         */
        saveIndicator() {
            Indicator.open({
                text: '修改中...',
                spinnerType: 'fading-circle'
            });
            setTimeout(() => {
                Indicator.close()
                Toast({
                    message: "修改成功！"
                })
            }, 1200);

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
    margin-top:16px;
}

.information-panel p {
    font-size:12px;
    margin-bottom:4px;
}
</style>