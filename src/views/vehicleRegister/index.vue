<template>
<div>
    <!-- v-if="!partnerVisible && !preparedVisible" -->
    <div class="page-field"  style="background-color:#fafafa" >
        <mt-header title="车辆入库登记">
            <a href="javascript:;" @click="goBack" class="goback" slot="left">
                <i class="mintui mintui-back"></i>
                返回</a>
            <router-link to="/homepage" class="tohomepage" slot="right"><i class="fa fa-home" aria-hidden="true"></i></router-link>
        </mt-header>

        <div class="page-field-wrapper">
            <!-- 当注册车辆的id不存在的时候就不显示车辆编码 -->
            <div class="page-part" v-show="vehicleInfo.id">
                <mt-field label="车辆编码" placeholder="无" v-model="vehicleInfo.id" disabled></mt-field>
            </div>
            <div class="page-part">
                <mt-field label="车牌号" placeholder="请输入车牌号" v-model="vehicleInfo.vehiclePlate" :attr="{ maxlength: 10 }">
                </mt-field>
                <mt-field label="汽车品牌" placeholder="请输入汽车品牌" v-model="vehicleInfo.vehicleBrand" :attr="{ maxlength: 10 }">
                </mt-field>
                <mt-field label="注册时间" placeholder="选择注册时间" type="date" v-model="vehicleInfo.registrationDate" >
                </mt-field>
                <mt-field label="车身颜色" placeholder="请输入车身颜色" v-model="vehicleInfo.vehicleColor" :attr="{ maxlength: 10 }">
                </mt-field>
            </div>
            <div class="page-part">
                <mt-field label="购车时间" placeholder="选择购车时间" type="date" v-model="vehicleInfo.purchaseDate" >
                </mt-field>
                <mt-field label="购车价格" placeholder="请输入购车价格（元）" v-model="vehicleInfo.purchasePrice" 
                :attr="{ maxlength: 10 }" @blur.native.capture="test(vehicleInfo.purchasePrice)">
                </mt-field>

                <!-- type="number"  -->
            </div>
            <div class="page-part">
                <mt-field label="备注信息" placeholder="请输入车辆备注信息" type="textarea" rows="1"
                v-model="vehicleInfo.vehicleNote" ></mt-field>
            </div>
        </div>

        <div class="row">
            <div class="col button-col">
                <center>
                    <a href="javascript:;" class="file" >拍照自动识别
                        <input type="file" accept="image/*" @change="uploadFile" ref="imageInput">
                    </a>
                </center>
            </div>
            <div class="col button-col">
                <center>
                    <mt-button size="small" @click="popupPartner">
                        <label style="margin-top:6px;"><small>登记合资情况</small></label>
                    </mt-button>
                </center>
            </div>
            <div class="col button-col">
                <center>
                    <mt-button size="small" @click="popupPreparedness">
                        <label style="margin-top:6px;">
                        <small>车辆整备情况</small></label>
                        </mt-button>
                </center>
            </div>
        </div>

        <div class="page-button" style="padding: 0px 10px;">
            <div class="page-button-wrapper">
                <mt-button type="primary" style="width: 100%" @click="uploadVehicleInfo">
                    <label style="margin-top:8px;">确认提交</label></mt-button>
            </div>
        </div>

        <!-- 删除车辆的按钮，当车辆id为空白的时候不可删除 -->
        <div class="page-button" style="padding: 0px 10px;margin-top:10px;margin-bottom: 20px;">
            <div class="page-button-wrapper">
                <mt-button type="danger" style="width: 100%" @click="deleteVehicle" :disabled="vehicleId==null">
                    <label style="margin-top:8px;">删除车辆</label>
                </mt-button>
            </div>
        </div>
        
        <mt-actionsheet
            :actions="actions1"
            v-model="sheetVisible1"
            :closeOnClickModal="closeOnClickModal">
        </mt-actionsheet>

        
    </div>
    <div :class="partnerVisible || preparedVisible?'dialog-page':''">
        <Partner  ref="partnerChild" v-show="partnerVisible" > </Partner>
        <Preparednesses ref="preparedChild" v-show="preparedVisible"> </Preparednesses>
    </div>

</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import vehiclePageRequest from '../../request/requests/vehicleInfo.js'

import plus from 'vue-html5plus'
import Partner from './addPartner'
import Preparednesses from './addPreparedness'
export default {
    data() {
        return {
            vehicleInfo:{
                id: null,
                vehiclePlate: null,
                vehicleBrand: null,
                registrationDate: null,
                vehicleColor: null,
                purchaseDate: null,
                purchasePrice: null,
                vehicleNote: null,
                saleitemId: null,
            },
            partner: {
                name: null,
                price: null,
            },
            vehicleId: null,
            closeOnClickModal: false,

            // action sheet 选项内容  
            actions1: [{  
                name: '拍照',  
                method : this.getCamera// 调用methods中的函数  
            }, {  
                name: '从相册中选择',   
                method : this.getLibrary// 调用methods中的函数  
            }],  

            // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏  
            sheetVisible1: false,

            partnerVisible: false,

            preparedVisible: false,



        }
    },
    components: {
        Partner,
        Preparednesses,
    },
    beforeCreate() {
        document.addEventListener('plusready',function() {
            let uuid= plus.device.uuid
        },false)
    },
    created() {
        this.getParams()
        this.judgeParams()
    },
    mounted() {
        
    },
    watch: {
        '$route': 'getParams'
    },

    filters: {
        numberPutComma(value) {
            let installVal = value;
            if(value != ''){
                value = Number(value).toFixed(2)
                let intPart = Math.trunc(value)// 获取整数部分
                let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                let floatPart = '.00' // 预定义小数部分
                let value2Array = value.split('.')
                // =2表示数据有小数位
                if(value2Array.length === 2) {
                    floatPart = value2Array[1].toString() // 拿到小数部分
                    if(floatPart.length === 1) { // 补0,实际上用不着
                        return intPartFormat + '.' + floatPart + '0'
                    } else {
                        if(installVal < 0 && intPartFormat == 0){
                            return '-' + intPartFormat + '.' + floatPart
                        }else{
                            return  intPartFormat + '.' + floatPart
                        }
                        
                    }
                } else {
                    return intPartFormat + floatPart
                }
            }else if(value == 0 && String(value)){
                return '0.00'
            }
        }
    },
    methods: {
        /**
         * 获取路由参数
         */
        getParams () {  
            this.vehicleId = this.$route.query.vehicleId
        },

        /**
         * 返回路由
         */
        goBack(){
            this.$router.go(-1);
        },

        /**
         * 根据是否有参数值来触发行为
         */
        judgeParams() {
            if(this.vehicleId != null){
                this.getVehicleInfo(this.vehicleId)
            }
        },

        /**
         * 点击提交按钮的函数
         * 如果是新建，那么使用post，如果是修改那么使用PUT
         */
        uploadVehicleInfo(){
            if(this.vehicleInfo.vehiclePlate && this.vehicleInfo.purchasePrice) {
                if(this.vehicleId) {
                    this.putVehicleInfo()
                }else {
                    this.postVehicleInfo() // 新提交车辆信息
                }
            } else {
                Toast("请检查车牌号和购车价格！")
            }
            
        },
        actionSheet1: function(){  
            this.sheetVisible1 = true;  
        },


        getCamera: function(){  
            Toast("打开照相机，暂时不可用")
             
        },  
        getLibrary: function(){  
            Toast("打开相册，暂时不可用")  
        },


        // 调用摄像头
        camera () {
            let that = this;
            var cmr = plus.camera.getCamera(); //获取摄像头管理对象
            var res = cmr.supportedImageResolutions[0]; //字符串数组，摄像头支持的拍照分辨率
            var fmt = cmr.supportedImageFormats[0]; //字符串数组，摄像头支持的拍照文件格式
            cmr.captureImage(function(path) {
                //进行拍照操作
                // 通过URL参数获取目录对象或文件对象
                plus.io.resolveLocalFileSystemURL(path, function(entry) {
                    var tmpPath = entry.toLocalURL(); //获取目录路径转换为本地路径URL地址
                    that.fileSrc = tmpPath
                    that.setImg(that.fileSrc);
                });
            })
        },

        // //从相册选择照片
        // galleryImgs() {
        //     plus.gallery.pick(function(e) {
        //         let name = e.substr(e.lastIndexOf('/') + 1);
        //         compressImage(e,name);
        //         }, function(e) {
        //         }, {
        //         filter: "image"
        //     });
        // },

        popupPartner () {
            this.partnerVisible = !this.partnerVisible
        },

        popupPreparedness () {
            this.preparedVisible = !this.preparedVisible
        },


        /**
         * 异步提交数据给后台
         */
        async getVehicleInfo(vehicleId){
            await vehiclePageRequest.vehicleRequest('GET', {}, {}, "/"+vehicleId)
                .then(res => {
                    this.updateVehicleInfo(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },

        updateVehicleInfo(res) {
            if(res.code === 200) {
                var vehicleInfo = res.data
                this.vehicleInfo = vehicleInfo
                if(!this.vehicleInfo.vehicleNote){
                    this.vehicleInfo.vehicleNote="无"
                }
            }
        },

        /**
         * 异步提交数据给后台
         */
        async postVehicleInfo(){
            let data = this.vehicleInfo
            data.purchasePrice = Number.parseInt(this.vehicleInfo.purchasePrice.replace(/,/g,""))
            if(data.purchasePrice > 10000000) {
                Toast("购车价太大，无法保存！")
                return false;
            }
            await vehiclePageRequest.vehicleRequest('POST', {}, data, '')
                .then(res => {
                    this.newUpdateVehicleInfo(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },

        /**
         * 新提交的车辆信息
         */
        newUpdateVehicleInfo(res) {
            if(res.code === 200){
                this.vehicleInfo.id = res.data
                Toast({
                    message: '操作成功',
                    iconClass: 'icon icon-success',
                    position: 'bottom',
                });
                // 如果新提交成功以后再次提交车辆的合作信息和整备信息

                this.$refs.partnerChild.newPostPartner(),
                this.$refs.preparedChild.newPostPreparedness()
            } else {
                Toast("" + res.message)
            }
        },


        /**
         * @description 异步提交数据给后台
         * @author 罗佳瑞
         * @since 2021年5月29日
         */
        async putVehicleInfo(){
            let data = this.vehicleInfo
            data.purchasePrice = Number.parseInt(this.vehicleInfo.purchasePrice.replace(/,/g,""))
            if(data.purchasePrice > 10000000) {
                Toast("购车价太大，无法保存！")
                return false;
            }
            await vehiclePageRequest.vehicleRequest('PUT', {}, data, "/"+data.id)
                .then(res => {
                    this.updatePutVehicleInfo(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },
        updatePutVehicleInfo(res){
            if(res.code === 200 ){
                Toast({
                    message: '操作成功',
                    iconClass: 'icon icon-success',
                    position: 'bottom',
                });
            } else {
                Toast("" + res.message)
            }
        },

        /**
         * 删除车辆
         */
        deleteVehicle() {
            if(this.vehicleId) {
                this.removeVehicleInfo()
            }else {
                this.$router.push({
                    path: '/vehicleRegister',
                    query: {
                        vehicleId: null,
                    }
                })
            }
        },

        /**
         * 异步提交数据给后天
         */
        async removeVehicleInfo(){
            await vehiclePageRequest.vehicleRequest('DELETE', {}, {}, '/'+this.vehicleId)
                .then(res => {
                    this.deleteVehicleState(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },

        /**
         * 车辆删除，删除以后将跳转到首页中。
         */
        deleteVehicleState(res){
            if(res.code===200) {
                Toast("删除"+ this.vehicleInfo.vehiclePlate + "成功");
                this.$router.push({
                    path: '/',
                })
            }else {
                Toast("删除失败");
            }
        },

        /**
         * 指示器，当前指示器使用定时器退出的。
         * @author： 罗佳瑞
         */
        indicator3 () {
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            setTimeout(()=>{
                Indicator.close();
            },3000)
        },

        /**
         * 图片拍照识别上传
         * @author: 罗佳瑞
         */
        uploadFile() {
            var that = this;
            var inputDOM = that.$refs.imageInput;
            var file = inputDOM.files;
            var formData = new FormData();
            formData.append('file', file[0]);
            this.uploadImage(formData)

            Indicator.open({
                text: '识别中...',
                spinnerType: 'fading-circle'
            });
            setTimeout(()=>{
                Indicator.close();
            },15000)


        },

        async uploadImage(formData) {
            await vehiclePageRequest.recorgnizeRequest(formData)
                .then(res => {
                    this.uploadImageResult(res)
                })
                .catch(err => {
                    Toast("" + err)
                })
        },

        uploadImageResult(res) {
            if(res.code==200) {
                var recorgnizeResult = res.data
                var rln = recorgnizeResult.licenseNumber
                var rvb = recorgnizeResult.name
                var rvc = recorgnizeResult.color;
                var rvy = recorgnizeResult.year;

                var resultStr = "";
                if(rln!=null){
                    this.vehicleInfo.vehiclePlate = rln;
                    resultStr = resultStr + "车牌可能是：" + rln + ";\n"
                }
                if(rvb!=null) {
                    this.vehicleInfo.vehicleBrand = rvb;
                    resultStr = resultStr + "品牌可能是：" + rvb + ";\n"
                }

                if(rvc!=null) {
                    this.vehicleInfo.vehicleColor = rvc;
                    resultStr = resultStr + "颜色可能是：" + rvc + ";\n"
                }
                if(rvy!=null) {
                    var rvyFormat = rvy.substr(0,4)
                    var strTime = rvyFormat + "-01-01"
                    // new Date(Date.parse(strTime.replace(/-/g,  "/")));
                    this.vehicleInfo.registrationDate = new Date();
                    resultStr = resultStr + "年代可能是：" + rvyFormat + "年;\n"
                }

                Indicator.close();

                Indicator.open({
                    text: "识别成功\n" + resultStr,
                    spinnerType: 'fading-circle'
                });
                setTimeout(()=>{
                    Indicator.close();
                },7500)


            }else{
                Toast({
                    message: "连接超时！"
                })
            }
        },

        test(value){
            if(value == null) return false;
            value = value.replace(/[^\d.]/g, ''); // 清除"数字"和"."以外的字符
            value = value.replace(/^\./g, ''); // 验证第一个字符是数字而不是.
            value = value.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
            value = value
                .replace('.', '$#$')
                .replace(/\./g, '')
                .replace('$#$', '.'); // 保证.只出现一次，而不能出现两次以上
            value = (+value).toFixed(2); // 只能输入两个小数
            let left = this.format_number(value.split('.')[0]),
                right = value.split('.')[1];
            value = left + '.' + right;

            this.$set(this.vehicleInfo, 'purchasePrice', value)
        },

        // 数值三位以，隔开
        format_number(n) {
            var b = parseInt(n).toString();
            var len = b.length;
            if (len <= 3) {
                return b;
            }
            var r = len % 3;
            return r > 0
                ? b.slice(0, r) +
                      ',' +
                      b
                          .slice(r, len)
                          .match(/\d{3}/g)
                          .join(',')
                : b
                      .slice(r, len)
                      .match(/\d{3}/g)
                      .join(',');
        }



        
    }
    
}
</script>

<style scoped>
.row {
    margin: 0px;
    text-align: center;
    margin: 10px 0px 20px 0px;
}
.col {
    padding: 0px;
    text-align: center;
    margin: auto;
}
ul {
  padding: 5px 10px;
}
li {
  margin-top: 20px;
}

.mint-cell-text {
    color:red;
}

.mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.mint-popup-3 .submit-button {
    position: absolute;
    width: 90%;
    top: 80%;
    left: 5%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
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
    margin-top:16px;
}

.information-panel p {
    font-size:12px;
    margin-bottom:4px;
}

.file {
    position: relative;
    display: inline-block;
    background: #f6f8fa;
    border: 1px solid #f3f3f4;
    border-radius: 4px;
    padding: 10px 12px;
    overflow: hidden;
    color: #656b79;
    text-decoration: none;
    text-indent: 0;
    line-height: 12px;
    font-size: 12px;
    margin-top: 2px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:active {
    background: #949596;
    border-color: #949596;
    color:#3d4049;
    text-decoration: none;
}


.dialog-page {
    position: absolute;
    top: 60px;
    border-top-right-radius: 32px;
    border-top-left-radius: 32px;
    background-color: rgba(255, 255, 255, 0.95);
    height: calc(100vh - 60px);
    width: 100%;
    padding-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    z-index: 999;
    animation:window-open 0.2s 1;
    /* -webkit-transition: all 0.4s ease-in; */
    /* transition: all 0.2s ease-in; */
    overflow-y: scroll;

}


@keyframes window-open
    {
       0% {
           /* bottom:-15.5rem; */
           top: 800px;
            /* bottom: -10px; */
       }
       /* 10% {
           top: 100px;
       } */
       100% {
           /* bottom:0; */
           top: 60px;
       }
    }

</style>