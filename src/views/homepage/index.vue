<template>
<div class="homepage-container" >
  <div id="header1" class="clearfix">
    <span class="examplename">{{ companyAbbreviation }}</span>
  </div>
  <div class="imgSwipe" :style="conheight">
    <mt-swipe :auto="4000" @change="IMGChange" > 
      <!-- //auto轮播时间  //轮播图切换时会触发 change 事件，参数为切入轮播图的索引  
      //speed 动画持时（毫秒）   -->
      <mt-swipe-item v-for="item in imglist" :key="item.id">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="item-left shadow-sm" @click="jump">
          <center>
          <div class="logo-item">
              <img slot="icon" src="../../assets/register.png" width="24" height="24">
          </div>
          </center>
          <div style="display: block;padding-top:6px;">
            车辆入库
          </div>
        </div>
      </div>
      <div class="col">
        <div class="item-right shadow-sm" @click="jumpToList">
        <center>
          <div class="logo-item">
              <img slot="icon" src="../../assets/car.png" width="28" height="28">
          </div>
        </center>
          <div style="display: block;padding-top:6px;">
            车辆列表
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="item-left shadow-sm" @click="jumpToSaleVehicle">
          <center>
            <div class="logo-item">
                <img slot="icon" src="../../assets/sale.png" width="29" height="29">
            </div>
          </center>
            <div style="display: block;padding-top:6px;">
            销售车辆
            </div>
        </div>
      </div>
      <div class="col">
        <div class="item-right shadow-sm" @click="jumpToStatictis">
          <center>
            <div class="logo-item">
                <img slot="icon" src="../../assets/statictis.png" width="24" height="24">
            </div>
          </center>
            <div style="display: block;padding-top:6px;">
              统计报表
            </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="item-left shadow-sm" @click="jumpToSettingPage">
          <center>
            <div class="logo-item">
                <img slot="icon" src="../../assets/set-icon.png" width="26" height="26">
            </div>
          </center>
            <div style="display: block;padding-top:6px;">
            系统设置
            </div>
        </div>
      </div>
      <div class="col">
        <div class="item-right shadow-sm" @click="jumpToCopyright">
          <center>
            <div class="logo-item">
                <img slot="icon" src="../../assets/more-icon.png" width="22" height="22">
            </div>
          </center>
            <div style="display: block;padding-top:6px;">
              版权信息
            </div>
        </div>
      </div>
    </div>

    <!-- <div class="footer">
      <center>
        <small>樱桃智库 copyright </small>
      </center>
    </div> -->

  </div>
</div>

</template>

<script>

import { Indicator } from 'mint-ui';

export default {
    data() {
        return {
          imglist:[
            // {img: require('../../assets/1.png')},
            {img: require('../../assets/2.png')},
            // {img: require('../../assets/3.png')}
          ],
          conheight:{
                height:''
            },
          pageHeight: {
            height:''
          }
        }
    },
    created(){
        window.addEventListener('resize', this.getHeight);
        this.getHeight()
        this.getPageHeight()
    },
    computed: {
      companyAbbreviation(){
        return sessionStorage.getItem("companyAbbreviation")
      }
    },
    methods: {
      /**
       * 更改轮播图的高度
       */
      getHeight(){
          // this.conheight.height=window.innerHeight-170+'px';
          this.conheight.height=window.innerWidth * 0.6+'px';
      },
      /**
       * 更改页面的高度
       */
      getPageHeight(){
        this.pageHeight.height = window.innerHeight - window.innerWidth * 0.6 - 67 + 'px';
      },
      /**
       * 跳转到车辆信息入库界面，车辆参数为空
       */
      jump() {
          this.$router.push({
              path: '/vehicleRegister',
              query: {
                  vehicleId: null,
              }
          })
      },
      /**
       * 跳转到车辆列表界面
       */
      jumpToList(){
        this.$router.push({
              path: '/vehicleList',
        })
      },
      /**
       * 跳转到车辆销售界面， 车辆参数为空
       */
      jumpToSaleVehicle() {
          this.$router.push({
            path: '/saleVehicle',
            query: {
              vehicleId: null,
            }
          })
      },
      /**
       * 跳转到统计页面
       */
      jumpToStatictis() {
          this.$router.push({path: '/statistics'})
      },
      /**
       * 轮播图切换页面
       */
      IMGChange(index){  //参数为当前轮播图的索引 
      },

      jumpToSettingPage() {
          this.$router.push({path: '/systemSetting'})
      },


      jumpToCopyright() {
        this.$router.push({path: '/copyright'})
      },


      /**
       * 指示器，当前指示器使用定时器退出的。
       * @author： 罗佳瑞
       */
      indicator3 () {
          // Indicator.open({
          //     text: '暂未开放...',
          //     spinnerType: 'fading-circle'
          // });
          // setTimeout(()=>{
          //     Indicator.close();
          // },1500)
      }
    }
    
}
</script>

<style scoped>
  #header1 {
    text-align: center;
    color: #ffffff;
    background-color: #24a6f1;
    font-weight: bold;
    padding: 20px 0px;
    font-size: 18px;
  }
.mt-header{
  background-color: aquamarine;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}

.imgSwipe{
  width: 100%;
}

.small{
  color: #999999;

}

.container {
  text-align: center;
  background-color: #e2ecf0;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
}

.row {
  margin-bottom: 10px;
}

.item-left{
  background-color: #fefefe;
  margin-right: -10px;
  border-radius: 4px;
  padding: 15px 5px;
  text-align: center;
}

.item-right{
  background-color: #fefefe;
  margin-left: -10px;
  border-radius: 4px;
  padding: 15px 5px;
}

.item-left:active { 
  background-color: #e6e6e6;
  margin-right: -10px;
  border-radius: 4px;
  padding: 15px 5px;
  text-align: center;

  transform: scale(0.98); 
  /* Scaling button to 0.98 to its original size */ 
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24); 
  /* Lowering the shadow */ 
  }

.item-right:active{
    background-color: #e6e6e6;
    margin-right: -10px;
    border-radius: 4px;
    padding: 15px 5px;
    text-align: center;

    transform: scale(0.98);
    /* Scaling button to 0.98 to its original size */
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    /* Lowering the shadow */
}

.logo-item{
  border-radius: 20px;
  width: 40px;
  height: 40px;
  background-color: #e2ecf0;
  display: block;
  padding: 5px;
}

.footer{
  color: #5f6368;
  position:fixed;    
  /* left:50%;   */
  top:95%;
  width: 100%;
}
</style>