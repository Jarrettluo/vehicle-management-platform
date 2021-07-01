<template>
    <div style="padding: 20px 10px 0px 10px">
        <div class="prepared-group" v-for='(item,index) in itemcountPrepared' :key="index" :id="'myid'+index" :v-model="preparednesses[index]">
            <mt-field label="整备项目" placeholder="请输入整备项目名称" type="text" v-model="preparednesses[index].repairItem"
            :attr="{ maxlength: 10 }"></mt-field>
            <mt-field label="整备金额" placeholder="请输入花费金额（元）" type="number" v-model="preparednesses[index].repairPrice"
            :attr="{ min: 0, max: 10000000 }"></mt-field>
            <mt-field 
            label="经手人" 
            placeholder="请输入经手人姓名" 
            type="text" 
            v-model="preparednesses[index].handlerName"
            readonly
            @click.native="getpopupVisible(index)">
            </mt-field>
            <mt-field 
            label="整备时间" 
            placeholder="请输入整备时间" 
            type="date" 
            v-model="preparednesses[index].handleDate">
            </mt-field>
            <hr>
        </div>
        <mt-button style="width: 100%" @click="addItemPrepared">
            <label style="margin-top:8px;">
                <i class="fa fa-plus-square-o" aria-hidden="true"></i> 增加整备类目
            </label>
        </mt-button>
        <div style="margin-top: 10px;" v-if="vehicleId">
            <mt-button style="width: 100%" type="danger" @click="modifyPreparedness">
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
                <p>- 点击增加整备类目的按钮可以增加整备项目。</p>
                <p>- 可以对已经入库的车辆修改车辆整备信息。</p>
                <p>- 清空整备项目的信息可以删除掉整备条目。</p>
            </div>
        </div>

        <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom">
            <div class="picker-toolbar-title">
                <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
                <div class="usi-btn-sure" @click="addrConfirm">确定</div>
            </div>
            <mt-picker ref='picker' :slots="slots" value-key='name' @change="onValuesChange"></mt-picker>
        </mt-popup>
        
    </div>
</template>

<script>
import preparedPageRequest from '../../request/requests/vehicleInfo.js'
import { Toast, Indicator } from 'mint-ui';

export default {
    data() {
        return {
            vehicleId: null,
            itemcountPrepared: 1,
            preparednesses: [{
                repairItem: null,
                repairPrice: null,
                handlerName: null,
                handlerDate: null,
                id: null,
            }],
            choosedIndex: null,
            popupVisible: false,
        }
    },
    computed:{
        /**
         * @description 渲染合伙人的列表
         */
        slots(){
            let array = [{
                id: 0,
                name: "万达鑫"
            }]
            this.partners.forEach(element => {
                if(element.name){
                array.push({
                    id: element.name,
                    name: element.name
                })
                }
            });
            return [{values: array}]
        }
    },
    props: ["partners"],
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
         * 获取路由参数
         */
        getParams () {  
            this.vehicleId = this.$route.query.vehicleId
        },

        /**
         * 根据是否有参数值来触发行为
         */
        judgeParams() {
            if(this.vehicleId != null){
                setTimeout(() => {
                    let vehicleInfo = this.$parent.vehicleInfo
                    if(vehicleInfo.preparednesses.length > 0){
                        var preparednesses = vehicleInfo.preparednesses;
                        this.preparednesses = preparednesses;
                        this.itemcountPrepared = preparednesses.length;
                    }
                }, 500);

            }
        },

        addItemPrepared () {
            let lastPreparedness = this.preparednesses[this.preparednesses.length -1]
            if(lastPreparedness.repairItem && lastPreparedness.repairPrice && lastPreparedness.handlerName && lastPreparedness.handleDate){
                this.itemcountPrepared += 1;
                this.preparednesses.push(
                    {
                        repairItem: null,
                        repairPrice: null,
                        handlerName: null,
                        handleDate: null
                    }
                )
            }
        },


        newPostPreparedness() {
            this.vehicleId = this.$parent.vehicleInfo.id
            // 新提交整备条目，这里需要剔除掉为空的数据
            var preparednessData = []
            for(var j=0, len1=this.preparednesses.length; j<len1;j++){
                if(this.preparednesses[j].repairItem && this.preparednesses[j].repairPrice 
                    && this.preparednesses[j].handlerName && this.preparednesses[j].handleDate){
                    preparednessData.push({
                        repairItem: this.preparednesses[j].repairItem,
                        repairPrice: parseFloat(this.preparednesses[j].repairPrice),
                        handlerName: this.preparednesses[j].handlerName,
                        handleDate: this.preparednesses[j].handleDate,
                        vehicleId: this.vehicleId
                    })
                }
            }
            if(preparednessData.length>0){
                this.postPreparedness(preparednessData) // 提交整备信息
            }
        },


        /**
         * 异步提交数据给后天
         */
        async postPreparedness(preparednessData){
            await preparedPageRequest.preparednessRequest('POST', {}, preparednessData, "")
                .then(res => {
                    this.postPreparednessResult(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },

        postPreparednessResult(res) {
            if(res.code != 200){
                Toast({
                    message: '合资人信息保存出错',
                });
            }
        },


        async deletePreparedness(){
            await preparedPageRequest.preparednessRequest('DELETE', {}, {}, "/"+this.vehicleId)
                .then(res => {
                    this.putPreparednessResult(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },

        putPreparednessResult(res) {
            if(res.code != 200){
                Toast({
                    message: '合资人信息保存出错',
                });
                
            }else {
                this.newPostPreparedness() //
            }
        },

        /**
         * @abstract: 修改整备信息
         * @author: 罗佳瑞
         * @since: 2020年1月27日
         */
        modifyPreparedness(){
            if(this.vehicleId) {
                // 如果id存在则提交修改整备项目
                this.deletePreparedness() // 删除整备项目
                this.saveIndicator()
            }
        },

        /**
         * 点击关闭以后触发的路由导航
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        backToVehicleInfo(){
            this.$parent.popupPreparedness();
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

        },
        /**
         * @description 打开弹窗，并赋予当前选中的索引
         * @since 2021年6月23日
         * @author 罗佳瑞
         */
        getpopupVisible(index) {
            this.popupVisible = true
            this.choosedIndex = index // 弹出的索引赋值
        },
        /**
         * @description 为各种数据进行赋值
         * @author 罗佳瑞
         * @since 2021年6月23日
         */
        onValuesChange(picker, values) {
            this.username = values[0].name;
            if(this.username && this.choosedIndex!=null) {
                this.preparednesses[this.choosedIndex].handlerName = this.username
            }else {
                return false
            }
        },
        addrConfirm() {
            this.popupVisible = false;
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
    margin-top:16px;
}

.information-panel p {
    font-size:12px;
    margin-bottom:4px;
}

.mint-header {
  background: #fff;
  color: #666;
  font-size: 16px;
}
 
.mint-popup {
  width: 100%;
}
 
.picker-toolbar-title {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  background: #f5f5f5;
}
 
.usi-btn-cancel,
.usi-btn-sure {
  color: #108EE9;
}


/* .prepared-group >>> input {
    text-align: left;
    padding: 0px;
}

.prepared-group /deep/ button {
    text-align: left;
} */
</style>