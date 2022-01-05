<template>
  <div>
    <div class="vin-header vin-item">
      <span>车辆VIN</span>
    </div>
    <div class="vin-info-group vin-item">
      <div v-for="x in ('123456789987654321')" class="vin-info">
        <span>{{ x }}</span>
      </div>
    </div>
    <div class="recognize-button vin-item">

      <a href="javascript:;" class="file" >
        <input type="file" id="userAvatar" accept="image/*" ref="imageInput" @change="afterRead">
        <img src="../../assets/识别车牌.png">
      </a>
    </div>
    <div style="margin-top: 10px;">
      <mt-button style="width: 100%" type="primary" @click="closePanel">
        <label class="mint-button-text" style="margin-top:8px;">确定</label>
      </mt-button>
    </div>
  </div>
</template>

<script>
import {compressImage} from '../../utils/CompressImageUtils'
import vehiclePageRequest from "../../request/requests/vehicleInfo";
import {Toast} from "mint-ui";

export default {
  name: 'addVin',
  data() {
    return {
      baiduClient: Object,
      userPhoto: null,
    }
  },
  props: ["vinCode"],
  mounted() {
  },
  // 图片压缩算法：https://juejin.cn/post/6844904048181657613
  // 参考说明文档：https://ai.baidu.com/ai-doc/OCR/Nkibizxlf#vin%E7%A0%81%E8%AF%86%E5%88%AB
  methods: {
    /**
     * 关闭面板
     **/
    closePanel(){
      this.$emit("close", this.vinCode)
    },
    //读取完图片后
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
     *
     * @param file
     * @param filename
     * @returns {Promise<void>}
     * @private
     */
    async _uploadImage(file, filename) {
      let params = new FormData();
      params.append("file", file, filename);
      await vehiclePageRequest.recorgnizeVinRequest(params)
          .then(res => {
            Toast("res:"  + res.data)
            console.log(res)
          })
          .catch(err => {
            Toast("" + err)
          })
    },
  }
}
</script>

<style scoped>
.vin-item {
  min-height: 48px;
  width: 100%;
}
.vin-header {
  line-height: 48px;
  font-size: 1rem;
  font-weight: normal;
  text-align: center;
}

.vin-info-group{
  display: flex;
  flex-direction: row;
  padding: 0 8px;
}

.vin-info {
  line-height: 48px;
  font-weight: normal;
  font-size: 1.25rem;
  flex: 1;
  text-align: center;
}
.vin-info span {
  height: 48px;
  background-color: #ccc;
  padding: 10px 3px;
  line-height: 48px;
  border-radius: 4px;
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

#userAvatar {
  height: 48px;
}

a {
  padding: 0px;
  border-radius: 24px;
}

</style>