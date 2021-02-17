
<template>
    <div>
        <!--开启摄像头-->
        <Button  type="primary"  @click="callCamera" style="margin-right: 10px;">开启摄像头</Button>
        <!--关闭摄像头-->
        <!-- <Button  type="primary"  @click="closeCamera">关闭摄像头</Button> -->
        <!--canvas截取流-->
        <canvas ref="canvas" width="640" height="480"></canvas>
        <!--图片展示-->
        <video ref="video" width="640" height="480" autoplay></video>
        <!--确认-->
        <!-- <Button  type="primary" @click="photograph">拍照</Button> -->

        <mt-button type="primary" @click="testCam">cest</mt-button>

        

    </div>
</template>
<script>
    export default {
        data () {
            return {
 
            }
        },
        methods: {
            // 调用摄像头
            callCamera () {
                // H5调用电脑摄像头API
                navigator.mediaDevices.getUserMedia({
                    video: true
                }).then(success => {
                    // 摄像头开启成功
                    this.$refs['video'].srcObject = success
                    // 实时拍照效果
                    this.$refs['video'].play()
                }).catch(error => {
                    console.error('摄像头开启失败，请检查摄像头是否可用！')
                })
            },
            // 拍照
            photograph () {
                let ctx = this.$refs['canvas'].getContext('2d')
                // 把当前视频帧内容渲染到canvas上
                ctx.drawImage(this.$refs['video'], 0, 0, 640, 480)
                // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
                let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)
 
                /**------------到这里为止，就拿到了base64位置的地址，后面是下载功能----------*/
 
                // 由字节转换为KB 判断大小
                let str = imgBase64.replace('data:image/jpeg;base64,', '')
                let strLength = str.length
                let fileLength = parseInt(strLength - (strLength / 8) * 2)　　　 // 图片尺寸  用于判断
                let size = (fileLength / 1024).toFixed(2)
                console.log(size) 　　  // 上传拍照信息  调用接口上传图片 .........
 
                // 保存到本地
                let ADOM = document.createElement('a')
                ADOM.href = this.headImgSrc
                ADOM.download = new Date().getTime() + '.jpeg'
                ADOM.click()
            },
            // 关闭摄像头
            closeCamera () {
                if (!this.$refs['video'].srcObject) return
                let stream = this.$refs['video'].srcObject
                let tracks = stream.getTracks()
                tracks.forEach(track => {
                    track.stop()
                })
                this.$refs['video'].srcObject = null
            },


            // 测试html5plus
            testCam(){
                console.log("ceshiceshi !")
                this.$plusExtends(()=>{
                var cmr = window.plus.camera.getCamera();
                cmr.captureImage((path )=>{
                alert(path)
                })
                })
            }
        }
    }
</script>