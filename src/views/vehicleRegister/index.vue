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
                <mt-field label="VIN" placeholder="17位车辆识别码" v-model="vehicleInfo.vinCode">
                    <a href="javascript:;" class="vin-image-file file" >
                        <input type="file" id="vin-image" accept="image/*" ref="imageInput" @change="afterRead">
                        <img src="../../assets/识别车牌.png" height="24px" width="24px">
                    </a>
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

        <div v-show="partnerVisible || preparedVisible || vinRecognizedVisible" style="position: absolute; z-index: 1; top: 0px; left: 0px; background-color: #1b1e21;opacity:0.2;width: 100%; height: 100vh;">
        </div>
        
        <mt-actionsheet
            :actions="actions1"
            v-model="sheetVisible1"
            :closeOnClickModal="closeOnClickModal">
        </mt-actionsheet>

        
    </div>
    <div :class="partnerVisible || preparedVisible?'dialog-page':''">
        <Partner  ref="partnerChild" v-show="partnerVisible" > </Partner>
        <Preparednesses ref="preparedChild" v-show="preparedVisible" :partners="partnerList"> </Preparednesses>
    </div>

    <div :class="vinRecognizedVisible ? 'vin-recog-panel' : ''" v-show="vinRecognizedVisible">
        <VinRecogRes
            :vinRecogniazeResult = vinRecogniazeResult
            :vinCode = vinCode
            @recognizeAgain="recognizeAgain"
            @cancelResult = "cancelResult"
            @confirmResult = "confirmResult"
        ></VinRecogRes>
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
import {compressImage} from '../../utils/CompressImageUtils'
import moment from 'moment'
import VinRecogRes from './vinRecogRes'

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
                companyId: sessionStorage.getItem("companyId"),
                vinCode: null,
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

            partnerVisible: false, // 合伙人输入框的可见状态

            preparedVisible: false, // 整备信息可见状态
            partnerList:[],
            masking: false, // 遮罩的module
            vinRecognizedVisible: false, // vin识别信息可见状态
            vinRecogniazeResult: {},
            vinCode: null,
        }
    },
    components: {
        Partner,
        Preparednesses,
        VinRecogRes
    },
    beforeCreate() {
        document.addEventListener('plusready',function() {
            let uuid= plus.device.uuid
        },false)
    },
    created() {
        this.getParams()
        this.judgeParams()
        this.vehicleInfo.registrationDate = moment((new Date()).getTime()).format('YYYY-MM-DD')
        this.vehicleInfo.purchaseDate = moment((new Date()).getTime()).format('YYYY-MM-DD')
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

        /**
         * @description 弹出整备选项
         * @author 罗佳瑞
         * @since 2021年6月23日
         */
        popupPreparedness () {
            this.preparedVisible = !this.preparedVisible
            this.partnerList = this.$refs.partnerChild.partners // 从子组件中获取全部的合伙人列表
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
            if (typeof(this.vehicleInfo.purchasePrice) == "string"){
                data.purchasePrice = Number.parseInt(this.vehicleInfo.purchasePrice.replace(/,/g,""))
            }
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
            if (typeof(this.vehicleInfo.purchasePrice) == "string"){
                data.purchasePrice = Number.parseInt(this.vehicleInfo.purchasePrice.replace(/,/g,""))
            }
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
        uploadFile(event) {
            let that = this;
            let fileContent = null;
            let file = event.target.files[0]
            let reader = new FileReader();
            reader.onloadend = function () {
                fileContent = reader.result;
                that._compressAndUploadFileCarType({
                    content: fileContent,
                    file: file
                })
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        },
        /**
         * //压缩图片上传
         * @author 罗佳瑞
         * */
        _compressAndUploadFileCarType(file) {
            compressImage(file.content).then(result => {
                if (result.size > file.file.size){
                    //压缩后比原来更大，则将原图上传
                    this.uploadImage(file.file, file.file.name);
                } else {
                    //压缩后比原来小，上传压缩后的
                    this.uploadImage(result, file.file.name)
                }
            })
        },
        /**
         * @author 罗佳瑞
         * */
        async uploadImage(file, filename) {
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            let params = new FormData();
            params.append("file", file, filename);
            await vehiclePageRequest.recorgnizeRequest(params)
                .then(res => {
                    this.uploadImageResult(res)
                })
                .catch(err => {
                    Indicator.close();
                    Toast("" + err)
                })
        },

        uploadImageResult(res) {
            Indicator.close();
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
                    var estimatedDate = new Date(rvyFormat + "-01-01");
                    this.vehicleInfo.registrationDate = moment(estimatedDate.getTime()).format("YYYY-MM-dd");
                    resultStr = resultStr + "年代可能是：" + rvyFormat + "年; "
                }
                Toast("识别成功\\n" + resultStr);
            }else{
                Toast({
                    message: "连接超时！"
                })
            }
        },

        /**
         * 读取完图片后调用此方法
         * */
        afterRead(event) {
        let that = this;
        let fileContent = null;
        let file = event.target.files[0]
        let reader = new FileReader();
        reader.onloadend = function () {
          fileContent = reader.result;
          that._compressAndUploadFile({
            content: fileContent,
            file: file
          })
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      },
      /**
       * //压缩图片上传
       * @author 罗佳瑞
       * */
      _compressAndUploadFile(file) {
        compressImage(file.content).then(result => {
          if (result.size > file.file.size){
            //压缩后比原来更大，则将原图上传
            this._uploadImage(file.file, file.file.name);
          } else {
            //压缩后比原来小，上传压缩后的
            this._uploadImage(result, file.file.name)
          }
        })
      },
      /**
       * 上传车辆的识别码认证
       * @param file
       * @param filename
       * @returns {Promise<void>}
       * @private
       */
      async _uploadImage(file, filename) {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let params = new FormData();
        params.append("file", file, filename);
        await vehiclePageRequest.recorgnizeVinRequest(params)
            .then(res => {
                Indicator.close();
                this.updateVinRecognizeResult(res)
            })
            .catch(err => {
              Toast("" + err)
              Indicator.close();
            })
      },
        /**
         *
         **/
        updateVinRecognizeResult(res) {
          if(res.code == 200 ){
              this.vinCode = res.data.vinCode
              this.vinRecogniazeResult = res.data.data
              // Toast("识别成功："  + res.data.vinCode)
              this.vehicleInfo.vinCode = res.data.vinCode
              this.switchVinRecognizedPanel(true) // 打开vin识别的弹窗页面
          }
          else {
              Toast("识别失败，请重试！")
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
        },
        /**
         * 重新打开识别器，请关闭弹窗
         * @since 2022年3月5日
         */
        recognizeAgain() {
            this.switchVinRecognizedPanel(false)

        },
        /**
         * 取消使用vin识别的信息填充，用于关闭信息，并重新赋值
         * @since 2022年3月5日
         */
        cancelResult() {
            this.switchVinRecognizedPanel(false)

        },
        /**
         * 确认用vin识别的信息来填充model
         * @since 2022年3月5日
         */
        confirmResult() {
            this.switchVinRecognizedPanel(false)
            this.vehicleInfo.vehicleBrand = this.vinRecogniazeResult.brand_name + this.vinRecogniazeResult.series_name
        },
        /**
         * 切换vin识别弹窗的开启关闭状态
         * @param state true ｜ false 代表开启和关闭
         */
        switchVinRecognizedPanel(state){
            if([false, true].includes(state)){
                this.masking = state
                this.vinRecognizedVisible = state
            }
            return
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

.mint-cell-value input {
    text-align: left;
}

.add-vin-panel {
  position:absolute;
  z-index: 2;
  bottom:200px;
  height: 300px;
  width: 100%;
  background-color: #fcfcfc;
  font-size: 1rem;
  padding: 10px;
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


.vin-image-file {
  background: none;
  border: none;
  padding: 0;
}


#vin-image {
  width: 28px;
  height: 28px;
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

.vin-recog-panel {
    position: absolute;
    height: calc( 100vh - 120px);
    width: calc(100vw - 20px);
    background-color: #fcfcfc;
    top: 60px;
    left: 10px;
    border-radius: 4px;
    z-index: 999;
}

</style>