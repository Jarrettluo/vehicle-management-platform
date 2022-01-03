<template>
  <div>
    {{ userPhoto }}
    <a href="javascript:;" class="file" >拍照自动识别
      <input type="file" id="userAvatar" accept="image/*" ref="imageInput" @change="fileChange">
    </a>
  </div>
</template>

<script>
import {compressImage} from '../../utils/CompressImageUtils'

export default {
  name: 'addVin',
  data() {
    return {
      baiduClient: Object,
      userPhoto: null,
    }
  },
  mounted() {
    this.initApi();
  },
  // 图片压缩算法：https://juejin.cn/post/6844904048181657613
  // 参考说明文档：https://ai.baidu.com/ai-doc/OCR/Nkibizxlf#vin%E7%A0%81%E8%AF%86%E5%88%AB
  methods: {
    initApi() {
      var AipOcrClient = require("baidu-aip-sdk").ocr;

      // 设置APPID/AK/SK
      const APP_ID = "23606590";
      const API_KEY = "4nXCAggI1tjzBIgQWBvbjaOM";
      const SECRET_KEY = "wtzGE0rxyfdPvcnzpCs2LNcXrMKjLiqQ";

      // 新建一个对象，建议只保存一个对象调用服务接口
      this.baiduClient = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

    },
    uploadFile() {
      //本地文件识别
      var fs = require('fs');
      var inputDOM = this.$refs.imageInput;
      var file = inputDOM.files;
      console.log(file)
      console.log(typeof(file));
      // var img = new Buffer(fs.readFileSync(file[0].)).t/oString('base64')
      // console.log(img)
      // var image = new Buffer(fs.readFileSync('assets/OCR/table.jpg')).toString('base64');
      // this.baiduClient.vinCode(image).then(function(result) {
      //   console.log(JSON.stringify(result));
      // }).catch(function(err) {
      //   // 如果发生网络错误
      //   console.log(err);
      // });
    },
    fileChange(event) {
      var that = this
      var files = document.getElementById("userAvatar").files[0]
      var reader = new FileReader();
      reader.onloadend = function () {
        that.userPhoto = reader.result;
        console.log(reader.result)
      };
      if (files) {
        reader.readAsDataURL(files);
      };
      this.baiduClient.vinCode(this.userPhoto).then(function(result) {
        console.log(JSON.stringify(result));
      }).catch(function(err) {
        // 如果发生网络错误
        console.log(err);
      });
    },

    //读取完图片后
    afterRead(file) {
      console.log('afterRead------', file);
      this._compressAndUploadFile(file);
    },

    //压缩图片上传
    _compressAndUploadFile(file) {
      compressImage(file.content).then(result => {
        console.log('压缩后的结果', result); // result即为压缩后的结果
        console.log('压缩前大小', file.file.size);
        console.log('压缩后大小', result.size);
        if (result.size > file.file.size){
          console.log('上传原图');
          //压缩后比原来更大，则将原图上传
          this._uploadFile(file.file, file.file.name);
        } else {
          //压缩后比原来小，上传压缩后的
          console.log('上传压缩图');
          this._uploadFile(result, file.file.name)
        }
      })
    },

    //上传图片
    _uploadFile(file, filename) {
      let params = new FormData();
      params.append("file", file, filename);
      this.$api.uploadImage(params).then(res => {
        console.log('uploadImage', res);
        //上传成功，写自己的逻辑
      }).catch(err => {
        console.log('err', err);
      });
    },
  }
}
</script>