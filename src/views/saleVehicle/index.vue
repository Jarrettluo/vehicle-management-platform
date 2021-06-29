<template>
    <div class="page-field" style="background-color:#fafafa">
        <mt-header title="车辆销售">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>

        <div class="search">
            <form class="search-block" action="javascript:void 0">
                <input v-model="keyword" type="text" class="searchInput"
                placeholder="搜索车辆信息" @keyup.enter="tapToSearch">
            </form>
        </div>
        <div class="searchList">
            <ul style="list-style-type:none">
                <li v-for="(item, index) in searchList" :key="index" @click="linkTo(item.id)">
                    <span>{{ item.vehiclePlate }}</span> <br>
                    <span><small> {{ item.vehicleBrand }} </small></span>
                </li>
            </ul>
        </div>

        <div style="padding: 0px 5px">
            <div v-if="vehicleInfo.vehiclePlate">
                <mt-cell :title="vehicleInfo.vehiclePlate" :label="vehicleInfo.vehicleBrand">
                    <mt-button type="primary" size="small" @click="editVehicleInfo" v-if="vehicleInfo.vehiclePlate">
                        <label style="margin-top:8px;">编辑</label></mt-button>
                </mt-cell>
            </div>
            <div>
                <!-- <mt-cell title="">
                    <span>{{ vehicleInfo.purchasePrice }}<span v-show="vehicleInfo.purchasePrice">.00元</span></span>
                </mt-cell> -->
                <mt-cell title="车辆购车价格">
                    <!-- <span>{{ saleItemData.partnerPrice }}<span v-show="saleItemData.partnerPrice">.00元</span></span> -->
                    <span>{{ vehicleInfo.purchasePrice }}<span v-show="vehicleInfo.purchasePrice">.00元</span></span>
                    <i @click="openPartnerDetail" class="mintui mintui-back" :class="[rotatePartner?'go':'aa']"></i>
                </mt-cell>
                <div style="width:100%; padding: 5px; font-color: #333;" v-if="rotatePartner">
                    <table border="1" width="100%" class="pure-table" style="color:#999;font-size:10px;">
                        <tr>
                            <th>出资人</th>
                            <th>投资金额(元)</th>
                            <th>投资比例(%)</th>
                            <th>收益金额(元)</th>
                        </tr>
                        <tr v-for="(item, index) in partnerList" :key="index">
                            <td>{{ item.name }} </td>
                            <td>{{ item.price }} <span v-show="item.price">.00</span></td>
                            <td>{{ item.ratio }}</td>
                            <td style="padding: 0px;"><input v-model="item.profit" type="number" style="width:90px;text-align:center;background-color:transparent;"></td>
                            <!-- <td><NumberInput :point="2" :max="99999" placeholder="请输入金额" v-model.number="item.profit"></NumberInput></td> -->
                        </tr>
                    </table>
                </div>
                    
                <mt-cell title="车辆整备价格" >
                        <span>{{ saleItemData.repairPrice }}<span v-show="saleItemData.repairPrice">.00元</span></span>
                        <i @click="openRepairDetail" class="mintui mintui-back" :class="[rotateRepair?'go':'aa']"></i>
                </mt-cell>

                <div style="width:100%; padding: 5px;" v-if="rotateRepair">
                    <table border="1" width="100%" class="pure-table" style="color:#999;font-size:10px;">
                        <tr>
                            <th>整备项目</th>
                            <th>整备金额(元)</th>
                            <th>经手人</th>
                            <th>操作时间</th>
                        </tr>
                        <tr v-for="(item, index) in prepareList" :key="index">
                            <td>{{ item.repairItem }}</td>
                            <td>{{ item.repairPrice }} <span v-show="item.repairPrice">.00</span></td>
                            <td>{{ item.handlerName }}</td>
                            <td>{{ item.handleDate }}</td>
                        </tr>
                    </table>
                </div>


                <div class="page-field-wrapper">
                    <div style="margin: 10px 0px;" class="page-part">
                        <form action="javascript:void 0">
                            <mt-cell title="售车价格" >
                                <input type="number" placeholder="输入售车价格" v-model="saleItemData.salePrice" @keyup.enter="tapToTrriger"
                                oninput="if(value>10000000)value=1000000;if(value.length>8)value=value.slice(0,8);if(value<0)value=0">
                            </mt-cell>

                            <mt-cell title="其他收入">
                                <span>{{ sumOtherIncome }}</span>
                                <i @click="openOtherIncome" class="mintui mintui-back" :class="[rotateOtherIncome?'go':'aa']"></i>
                            </mt-cell>
                            <transition name="draw">   <!--这里的name 和 css 类名第一个字段要一样-->
                                <div v-show="rotateOtherIncome" style="background-color:#fff;">
                                    <mt-cell title="按揭返款">
                                        <input 
                                        type="number"
                                        placeholder="输入按揭返款"
                                        v-model="mortgageRebateValue" 
                                        oninput="if(value>100000)value=100000;if(value.length>6)value=value.slice(0,6);if(value<0)value=0"
                                        >
                                    </mt-cell>
                                    <mt-cell title="保险退费">
                                        <input 
                                        type="number" 
                                        placeholder="输入保险退费" 
                                        v-model="insuranceRefundValue"
                                        oninput="if(value>100000)value=100000;if(value.length>6)value=value.slice(0,6);if(value<0)value=0"
                                        required>
                                    </mt-cell>                  
                                </div>
                            </transition>
                            <mt-cell title="销售提成比例(%)">
                                <input type="number" placeholder="输入提车比例" v-model="saleItemData.commissionRate" @keyup.enter="tapToTrriger">
                            </mt-cell>
                            <mt-cell title="销售提成">
                                <input type="number" placeholder="输入销售提成" v-model="saleItemData.commissionPrice" @keyup.enter="tapToTrriger">
                            </mt-cell>
                        </form>
                    </div>

                    <div class="partner-settlement">
                        <div class="partner-header">
                            出资人分账
                            <div class="partner-add" @click="openPartners(); partnerVisable = !partnerVisable"></div>
                        </div>
                        <div class="partner-body" v-show="partnerVisable">
                            <table border="1" width="100%" class="partner-table" style="color:#999;font-size:10px;">
                                <tr>
                                    <th>出资人</th>
                                    <th>出资金额(元)</th>
                                    <th>整备金额(元)</th>
                                    <th>收益金额(元)</th>
                                    <th>总计(元)</th>
                                </tr>
                                <tr v-for="(item, index) in partnerList" :key="index">
                                    <td>{{ item.name }} </td>
                                    <td>{{ item.price }}<span v-show="item.price">.00</span></td>
                                    <td>{{ item.prepare }}</td>
                                    <td>{{ item.profit }}</td>
                                    <td style="padding: 0px;"><input v-model="item.total" type="number" style="width:90px;text-align:center;background-color:transparent;color:#fff;"></td>
                                    <!-- <td><NumberInput :point="2" :max="99999" placeholder="请输入金额" v-model.number="item.profit"></NumberInput></td> -->
                                </tr>
                            </table>

                            <!-- <div class="partner-item">
                                fjdsljfsldj
                            </div> -->
                        </div>
                    </div>


                    <div class="page-part">
                        <mt-cell title="公司利润">
                            <span style="color: red">{{ saleItemData.selfProfit }}</span>
                        </mt-cell>
                        <!-- <mt-cell title="出资人分账">
                                <span>{{ sumOtherIncome }}</span>
                                <i @click="openOtherIncome" class="mintui mintui-back" :class="[rotateOtherIncome?'go':'aa']"></i>
                        </mt-cell>
                        <div style="width:100%; padding: 5px; font-color: #333;" v-if="rotatePartner">
                            <table border="1" width="100%" class="pure-table" style="color:#999;font-size:10px;">
                                <tr>
                                    <th>出资人</th>
                                    <th>投资金额(元)</th>
                                    <th>投资比例(%)</th>
                                    <th>收益金额(元)</th>
                                </tr>
                                <tr v-for="(item, index) in partnerList" :key="index">
                                    <td>{{ item.name }} </td>
                                    <td>{{ item.price }} <span v-show="item.price">.00</span></td>
                                    <td>{{ item.ratio }}</td>
                                    <td style="padding: 0px;"><input v-model="item.profit" type="number" style="width:90px;text-align:center;background-color:transparent;"></td>
                                     -->
                                    <!-- <td><NumberInput :point="2" :max="99999" placeholder="请输入金额" v-model.number="item.profit"></NumberInput></td> -->
                                <!-- </tr>
                            </table>
                        </div> -->
                        <mt-cell title="是否结账">
                            <mt-switch v-model="vClearState"></mt-switch>
                        </mt-cell>
                    </div>

                    
                </div>
            </div>
            <div style="padding:0px 10px">
                <mt-button type="primary" style="width: 100%" @click="clickUpload">
                    <label style="margin-top:8px;">销售车辆</label></mt-button>
                <div style="margin-top: 10px;" v-if="vehicleInfo.saleitemId">
                    <mt-button type="danger" style="width: 100%" @click="clickRemove">
                        <label style="margin-top:8px;">取消销售</label></mt-button>
                </div>
            </div>

            <div class="information-panel">
                <div><p>说明信息</p></div>
                <div>
                    <p>- 销售提成的比例默认是7%, 可以对提成比例进行修改。</p>
                    <p>- 销售提成的基数是售车价减去购车价再减去整备费用。</p>
                    <p>- 销售提成金额优先，输入提成金额会自动计算销售提成。</p>
                    <p>- 出资人的利润是按照分成规则进行计算。</p>
                    <p>- 已经销售的车辆可以重新计算利润。</p>
                    <p>- 只有销售的车辆才能执行取消销售的操作。</p>
                </div>
            </div>
        </div>

        <vue-floating isNearBorder @tap="floatingTap" :rightMargin="0" :bottomMargin="20">
            <div class="floatingView"></div>
        </vue-floating>
        <div style="position: absolute; top:88px; z-index: 10;width:100%;padding:10px;" v-show="showCalc">
            <div class="content" style="padding: 10px;">
                <Calculator></Calculator>
            </div>
        </div>
    </div>
</template>

<script>
import vehicleInfoRequest from '../../request/requests/vehicleInfo'
import salePageRequest from '../../request/requests/saleItem'
import searchPageRequest from '../../request/requests/search'
import { Toast } from 'mint-ui'
import NumberInput from '@/components/Plugin/Form/NumberInput'
import Calculator from './calculator.vue'

export default {
    components: {
        NumberInput,
        Calculator
    },
    data() {
        return {
            vehicleInfo:{
                id: null,
                vehicleNubmer: null,
                vehiclePlate: null,
                vehicleBrand: null,
                registrationDate: null,
                vehicleColor: null,
                purchaseDate: null,
                purchasePrice: null,
                vehicleNote: null,
                saleitemId: null,
            },

            saleItemData: {
                id: null,
                salePrice: null,
                commissionRate: 7, // 默认提成比例
                commissionPrice: null,
                repairPrice: 0, // 总的整备金额
                partnerPrice: null, // partnerPrcie 合伙人总的出资
                partnerProfit: null,
                selfProfit: null,
                saleDate: null,
                vehicleId: null,
                clearState: null,
            },

            vClearState: false, // 是否结账的布尔量

            vehicleId: null,

            liConHeight: 0, // 折叠面板内容初始高度
            keyword: null, // 搜索框的值

            searchList: [], // 搜索结果的列表
            partnerList: [], // 合伙人的列表
            prepareList: [], // 整备项目的列表

            rotateRepair:false, // 是否旋转整备项目
            rotatePartner: false, // 旋转合作伙伴

            showCalc: false,

            mortgageRebateValue: 0, // 按揭返款
            insuranceRefundValue: 0, // 保险退费
            rotateOtherIncome: false, // 是否旋转其他收入的项目

            partnerVisable: false, // 合伙人分账是否可见

        }
    },
    created() {
        this.getParams()

    },
    mounted() {
        this.judgeParams()
    },
    computed: {
        sumOtherIncome:function () {
            if(this.mortgageRebateValue === null || this.mortgageRebateValue < 0 || this.mortgageRebateValue == ""){
                this.mortgageRebateValue = 0 // 按揭返款
            }
            if(this.insuranceRefundValue == null || this.insuranceRefundValue < 0 || this.insuranceRefundValue == "") {
                this.insuranceRefundValue = 0 // 保险退费
            }
            return parseFloat(this.mortgageRebateValue)+parseFloat(this.insuranceRefundValue);	
        },
    },
    filters: {
        numFilter (value) {
            // 截取当前数据到小数点后两位
            return parseFloat(value).toFixed(2)
        }
    },
    methods: {
        /**
         * 获取路由参数
         * @author 罗佳瑞
         * @since 2021年1月19日
         */
        getParams () {
            let vehicleId = this.$route.query.vehicleId
            this.vehicleId = vehicleId
        },

        /**
         * 返回的选项
         * @author 罗佳瑞
         * @since 2021年1月19日
         */
        goBack(){
            this.$router.go(-1);
        },

        /**
         * 判断路由的参数，如果车辆id是存在的，那么就去查询该车辆的信息
         * @author 罗佳瑞
         * @since 2021年1月19日
         */
        judgeParams(){
            if(this.vehicleId != null){
                this.getVehicleInfo(this.vehicleId)
            }
        },

        /**
         * 异步获取车辆的数据。根据车辆的id查询车的各种属性值。
         * @author 罗佳瑞
         * @since 2021年1月19日
         */
        async getVehicleInfo(vehicleId){
            await vehicleInfoRequest.vehicleRequest('GET', {}, {}, "/"+vehicleId)
                .then(res => {
                    this.updateVehicleInfo(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },

        /**
         * 获取车辆数据的结果。如果正常返回结果，那么将结果映射到dom
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        updateVehicleInfo(res) {
            if(res.code === 200) {
                var vehicleData = res.data
                this.vehicleInfo = vehicleData

                var totalPartnerPrice = 0
                if(vehicleData.partners.length){
                    for(var i=0,len=vehicleData.partners.length; i<len;i++){
                        totalPartnerPrice += vehicleData.partners[i].price;
                    }
                    this.partnerList = vehicleData.partners
                }
                this.saleItemData.partnerPrice = totalPartnerPrice;

                var selfPrice = this.vehicleInfo.purchasePrice - totalPartnerPrice
                var selfInvest = {name: "万达鑫", price: selfPrice}
                this.partnerList.push(selfInvest) // 将自己的投资比例写入到合作伙伴中

                var totalPreparedPrice = 0
                if(vehicleData.preparednesses.length) {
                    for(var j=0, len1 = vehicleData.preparednesses.length; j<len1; j++){
                        totalPreparedPrice += vehicleData.preparednesses[j].repairPrice;
                    }
                    this.prepareList = vehicleData.preparednesses;
                }
                this.saleItemData.repairPrice = totalPreparedPrice;
                // 如果车辆的是已经销售的那么就将获取其销售信息
                if(vehicleData.saleitemId) {
                    this.acquireSaleItemData()
                }
            }
        },

        /**
         * 异步获取车辆的销售数据。
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        async acquireSaleItemData(){
            await salePageRequest.saleItemRequest('GET', {}, {}, "/"+this.vehicleId)
                .then(res => {
                    this.updateSaleItemDate(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },
        
        /**
         * 车辆的销售数据更新到dom，如果正常返回那么就开始计算合伙人和整备的明细
         * @author: 罗佳瑞
         * @since: 2021年1月19日，2021年6月19日更新
         */
        updateSaleItemDate(res) {
            if (res.code === 200) {
                if(res.data){
                    var saleData = res.data
                    if(saleData.clearState == 1){
                        this.vClearState = true;
                    }else {
                        this.vClearState = false;
                    }
                    this.saleItemData = saleData
                    this.mortgageRebateValue = saleData.mortgageRebate // 贷款返佣
                    this.insuranceRefundValue = saleData.insuranceRefund // 保险退费

                    this.tapToTrriger()
                }
            }
        },

        /**
         * 点击上传按钮的触发程序。如果不存在车辆的id那么就不能使用，如果存在则可以进行下一步操作；
         * 如果销售的id存在，那么再次点击的将智能进行修改（PUT）
         * @author 罗佳瑞
         * @since 2021月1月19日
         */
        clickUpload() {
            if(this.vehicleInfo.id && this.saleItemData.salePrice){
                if(this.saleItemData.salePrice > 10000000) {
                    Toast("售车价过大！")
                    return false;
                }
                this.tapToTrriger() // 点击销售的时候再次计算一次，避免没有进行激活导致的bug
                if(this.saleItemData.id != null){
                    this.putSaleItemDate()
                }else {
                    this.uploadSaleItemData()
                }
            }else{
                Toast("请填写完整后提交！")
            }
        },

        /**
         * 异步提交数据给后台，提交销售数据
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        async uploadSaleItemData(){
            this.saleItemData.vehicleId = this.vehicleInfo.id
            if(this.vClearState == true){
                this.saleItemData.clearState = 1
            }else{
                this.saleItemData.clearState = 0
            }
            this.saleItemData.saleDate = new Date();
            this.saleItemData.mortgageRebate = this.mortgageRebateValue // 赋值
            this.saleItemData.insuranceRefund = this.insuranceRefundValue // 赋值
            await salePageRequest.saleItemRequest('POST', {}, this.saleItemData, "")
                .then(res => {
                    this.postResult(res)
                })
                .catch(err => {
                    Toast("错误：" + err)
                })
        },
        /**
         * 提交销售数据到后台返回的结果
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        postResult(res) {
            if(res.code==200) {
                this.vehicleInfo.saleitemId = res.data
                this.saleItemData.id = res.data
                Toast("恭喜!  " + this.vehicleInfo.vehiclePlate + "销售成功")
            }else {
                Toast("提交失败！")
            }
        },

        /**
         * 异步将修改的数据提交到后台
         */
        async putSaleItemDate(){
            if(this.vClearState == true){
                this.saleItemData.clearState = 1
            }else{
                this.saleItemData.clearState = 0
            }
            if(this.saleItemData.id == null) return false;
            this.saleItemData.mortgageRebate = this.mortgageRebateValue // 新增贷款返佣
            this.saleItemData.insuranceRefund = this.insuranceRefundValue // 新增保险退费
            await salePageRequest.saleItemRequest('PUT', {}, this.saleItemData, "")
                .then(res => {
                    this.updateResult(res)
                })
                .catch(err => {
                    Toast("错误：" + err)
                })
        },

        /**
         * 更新数据的结果。
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        updateResult(res) {
            if(res.code==200) {
                // this.saleItemData.id = res.data
                Toast("" + this.vehicleInfo.vehiclePlate + "修改成功")
                this.acquireSaleItemData()
            }else {
                Toast("提交失败！:" + res.message)
            }
        },

        /**
         * 点击编辑车辆信息触发的路由导航
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        editVehicleInfo(){
            this.$router.push({
                path: '/vehicleRegister',
                query: {
                    vehicleId: this.vehicleId
                }
            })
        },

        /**
         * 选择搜索结果列表中的某一项后触发的内容
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        tapToSearch(){
            if(this.keyword){
                this.searchVehicles()
                this.saleItemData = {
                    id: null,
                    salePrice: null,
                    commissionRate: 6, // 默认提成比例
                    commissionPrice: null,
                    repairPrice: null, // 总的整备金额
                    partnerPrice: null, // partnerPrcie 合伙人总的出资
                    partnerProfit: null,
                    selfProfit: null,
                    saleDate: null,
                    vehicleId: null,
                    clearState: false,
                }
            }
        },

        
        /**
         * 异步提交搜索数据给后台
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        async searchVehicles(){
            var params = {vehiclePlate: this.keyword.toString()}
            await searchPageRequest.searchRequest(params)
                .then(res => {
                    this.updateVehicleList(res)
                })
                .catch(err => {
                    Toast("错误："+err)
                })
        },

        /**
         * 更新查询的列表
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        updateVehicleList(res) {
            if(res.code == 200){
                if(!res.data.length){
                    Toast("没有查询到相关车辆")
                }
                this.searchList = res.data
            }else {
                Toast("没有查询到相关车辆")
                this.searchList = []
            }
        },

        /**
         * 点击某个搜索结果的触发函数
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        linkTo(id){
            this.vehicleId = id
            this.getVehicleInfo(id)
            this.searchList = null
        },

        /**
         * 输入内容后触发的计算函数，通过该函数能够计算出各种细节
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         * TODO 这里已经失效，采用最新的计算方法
         */
        tapToTrriger1(){
            if(this.saleItemData.salePrice>0 && this.vehicleInfo.purchasePrice > 0){
                var priceDiff = this.saleItemData.salePrice - this.vehicleInfo.purchasePrice
                if(this.saleItemData.commissionPrice > 0){
                    // 计算提成的比例
                    this.saleItemData.commissionRate = (this.saleItemData.commissionPrice * 100)/priceDiff
                }else{
                    if(this.saleItemData.commissionRate!=null){
                        // 如果提成金额不存在，那么通过提成比例进行计算
                        // 售价 减去 购买的价乘以提成系数等于提成金额
                        this.saleItemData.commissionPrice = (priceDiff)*this.saleItemData.commissionRate * 0.01 
                    }
                }

                // 计算利润, 价格差-合伙人
                var allProfit = priceDiff - this.saleItemData.commissionPrice - this.saleItemData.repairPrice
                var selfPrice = this.vehicleInfo.purchasePrice - this.saleItemData.partnerPrice
                for(var i=0, len = this.partnerList.length; i<len;i++){
                    var ratio = this.partnerList[i].price / this.vehicleInfo.purchasePrice
                    var profit = ratio * allProfit
                    this.partnerList[i]['ratio'] = ratio
                    this.partnerList[i]['profit'] = profit
                }

                // 计算自身的利益
                this.saleItemData.selfProfit = selfPrice/this.vehicleInfo.purchasePrice * allProfit
                this.saleItemData.partnerProfit = allProfit - this.saleItemData.selfProfit
            }
        },
        /**
         * @description 输入车辆的销售价格以后进行计算车辆的各项费用
         * @since 2021年6月19日
         */
        tapToTrriger(){
            if(this.saleItemData.salePrice>0 && this.vehicleInfo.purchasePrice > 0){

                // 计算毛利润，公式为销售价 + 按揭返款 + 保险退费 - 购车价 - 整备金额
                var grossProfit = parseFloat(this.saleItemData.salePrice) + this.sumOtherIncome - this.vehicleInfo.purchasePrice - this.saleItemData.repairPrice

                // if(this.saleItemData.commissionPrice > 0){
                //     // 计算提成的比例
                //     this.saleItemData.commissionRate = (this.saleItemData.commissionPrice * 100)/grossProfit
                // }else{
                //     if(this.saleItemData.commissionRate!=null){
                //         // 如果提成金额不存在，那么通过提成比例进行计算
                //         // 售价 减去 购买的价乘以提成系数等于提成金额
                //         this.saleItemData.commissionPrice = (grossProfit)*this.saleItemData.commissionRate * 0.01 
                //     }
                // }
                
                // 修改为按照销售提成的比例进行计算
                if(this.saleItemData.commissionRate!=null){
                    // 如果提成金额不存在，那么通过提成比例进行计算
                    // 售价 减去 购买的价乘以提成系数等于提成金额
                    let commissionNum = (grossProfit)*this.saleItemData.commissionRate * 0.01 
                    this.saleItemData.commissionPrice = parseFloat(commissionNum).toFixed(2)
                }

                // 计算利润, 价格差-合伙人
                // 净利润为 毛利润减去提成，得到
                var allProfit = grossProfit - this.saleItemData.commissionPrice
                var selfPrice = this.vehicleInfo.purchasePrice - this.saleItemData.partnerPrice
                var profit = 0
                for(var i=0, len = this.partnerList.length; i<len;i++){
                    var ratio = 1/len; // 合伙比例为所有人的金额
                    profit = ratio * allProfit
                    this.partnerList[i]['ratio'] = (ratio*100).toFixed(2)
                    this.partnerList[i]['profit'] = profit.toFixed(2)
                }

                // 计算自身的利益
                this.saleItemData.selfProfit = profit.toFixed(2);
                this.saleItemData.partnerProfit = allProfit - this.saleItemData.selfProfit

                // 计算完以后再计算分账
                this.openPartners()
            } else {
                Toast("车辆信息不足！");
                return false;
            }
        },

        /**
         * 打开整备的细节面板
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        openRepairDetail(){
            this.rotateRepair=!this.rotateRepair;
        },

        /**
         * 打开合伙人的细节面板
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        openPartnerDetail(){
            this.rotatePartner=!this.rotatePartner;
        },

        /**
         * 点击取消销售按钮后开始删除销售的信息
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        clickRemove() {
            if(this.saleItemData.id) {
                this.removeSaleItem()
            }
        },

        /**
         * 异步对文件进行销售
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        async removeSaleItem(){
            var saleData = this.saleItemData
            if(saleData.clearState){
                saleData.clearState = 1;
            }else {
                saleData.clearState = 0;
            }
            await salePageRequest.saleItemRequest('DELETE', {}, this.saleItemData, "")
                .then(res => {
                    this.removeResult(res)
                })
                .catch(err => {
                    Toast("错误：" + err)
                })
        },

        /**
         * 删除车辆的销售信息结果
         * @author: 罗佳瑞
         * @since: 2021年1月19日
         */
        removeResult(res) {
            if(res.code == 200) {
                Toast(this.vehicleInfo.vehiclePlate + "取消销售！")
                this.judgeParams()
                this.saleItemData= {
                    id: null,
                    salePrice: null,
                    commissionRate: 6, // 默认提成比例
                    commissionPrice: null,
                    repairPrice: 0, // 总的整备金额
                    partnerPrice: null, // partnerPrcie 合伙人总的出资
                    partnerProfit: null,
                    selfProfit: null,
                    saleDate: new Date(),
                    vehicleId: null,
                    clearState: false,
                }
            }
        },
        floatingTap() {
            this.showCalc = !this.showCalc
        },
        /**
         * @description 点击旋转按钮以后就翻转boolean
         */
        openOtherIncome() {
            this.rotateOtherIncome = !this.rotateOtherIncome; // 翻转其他收入的显示细节
        },
        /**
         * @description 点击合伙人分账
         */
        openPartners() {
            var tbl = document.getElementsByClassName("partner-table"); // 先获取table
            var rows = tbl[0].getElementsByTagName("tr"); // 获取里面的行tr
            for(var i=1;i<rows.length;i++) {  // 遍历里面的行
                    // var j = parseInt(i/3); // 以每3行为单位,j为：3次0，3次1，3次2 ... 
                    if(i%5==1){ // 再通过取模来设置每隔3行显示不同的两种颜色
                        rows[i].style.backgroundColor="#4285f4";
                    }else if(i%5==4){
                        rows[i].style.backgroundColor="#34a853";
                    }else if(i%5==3){
                        rows[i].style.backgroundColor="#fbbc05";
                    }else if(i%5==2) {
                        rows[i].style.backgroundColor="#ea4335";
                    }else {
                        rows[i].style.backgroundColor="#fff";
                    }
            }
            this.partnerList.forEach(item => {
                item.prepare = 0
                if(item.profit){
                    item.total = item.price + parseFloat(item.profit)
                }else {
                    item.total = item.price
                }
                
            })

            this.prepareList.forEach(element => {
                let person = this.partnerList.filter(item => item.name == element.handlerName)[0] // 筛查出该名称
                if(person){
                    person.prepare += element.repairPrice
                    person.total += element.repairPrice
                }else {
                    let wandaxin = this.partnerList.filter(item => item.name == "万达鑫")[0] 
                    wandaxin.prepare += element.repairPrice
                    wandaxin.total += element.repairPrice
                }
            })
        }

    }
}
</script>

<style scoped>
.newslist>li>div{
  height: 0px;
  overflow: hidden;
  transition: height .3s; 
}

.search {
    width: 100%;
    height: 4rem;
    background-color: #e2ecf0
}

.searchInput {
    width: 92%;
    margin-top: .5rem;
    margin-left: 4%;
    line-height: 2rem;
    border: #ccc 1px solid;
    text-align: left;
    font-size: 14px;
    background-color: #f5f6f7;
    border-radius: 6px;
    padding-left: 10px;
}

ul{
    list-style-type: none;
    margin:0px;
    padding: 5px 16px;
    }
ul li{
    display:block;
    width: 100%;
    background:#f1f3f4;
    padding: 5px 5px 5px 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    }

ul li:nth-child(2n+1) {
    background:#fafafa;
}

ul li:hover{
    background:#999;
}

input {
    outline-style: none;
    border: 0px;
    text-align: right;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}
 
td,th {
    padding: 0;
}
 
.pure-table {
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #cbcbcb;
    font-size: 12px;
    text-align: center;
    color: #000;
}
 
.pure-table caption {
    color: #000;
    font: italic 85%/1 arial,sans-serif;
    padding: 1em 0;
    text-align: center;
}
 
.pure-table td,.pure-table th {
    border-left: 1px solid #cbcbcb;
    border-width: 0 0 0 1px;
    font-size: inherit;
    margin: 0;
    overflow: visible;
    padding: .5em 1em;
}
 
.pure-table thead {
    background-color: #e0e0e0;
    color: #000;
    text-align: left;
    vertical-align: bottom;
}

.pure-table tr:nth-child(odd){
    background-color: #f2f2f2;
}
 
.pure-table td {
    background-color: transparent;
}
 

.aa{
    transform:rotate(-180deg);
    transition: all 0.5s;
}
.go{
    transform:rotate(-90deg);
    transition: all 0.5s;
}

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

.floatingView{
    background-image: url('http://yanxuan.nosdn.127.net/4cc272e9f9eddae1bfe4d057d2fe549a.png');
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.content {
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 4px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

    .draw-enter-active, .draw-leave-active {
        transition: all 1s ease;
    }
    .draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
        height: 0;
    }

    .partner-settlement {
        border-radius: 2px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .partner-header {
        background-color: #fff;
        padding: 10px;
        font-size: 16px;
        font-weight: 400;
    }

    .partner-add {
        /* border: 1px solid; */
        width: 18px;
        height: 18px;
        color: #ccc;
        transition: color .25s;
        position: relative;
        float: right;
    }

    .partner-add::before{
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 16px;
        margin-left: -10px;
        margin-top: 3px;
        border-top: 1px solid;
    }

    .partner-add::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        height: 16px;
        margin-left: -3px;
        margin-top: -4px;
        border-left: 1px solid;
    }

    .partner-body {
        border-top: 0.5px solid #f1f2f3;
        padding: 5px;
        margin-top: 0px;
    }

    .partner-table {
        padding: 0px;
        margin: 0px;
        border: none;
        border-collapse: separate;
        border-spacing: 0px 5px;
    }

    .partner-table td {
        border: none;
        font-size: 12px;
        padding: 5px 0px;
        margin: 2px 0px;
        color: #fff;
        text-align: center;
    }

    .partner-table th {
        border: none;
        font-size: 13px;
        padding: 0px 0px;
        text-align: center;
    }

    .partner-item {

    }

</style>