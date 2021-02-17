<template>
  <div id="app">
    <router-view/>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <mt-header fixed title="固定在顶部"></mt-header>

    <mt-search v-model="value"></mt-search> -->


    <!-- <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-container1">
        <mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
        <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab-container1">
        <img slot="icon" src="./assets/100x100.png">
        外卖
      </mt-tab-item>
      <mt-tab-item id="tab-container2">
        <img slot="icon" src="./assets/100x100.png">
        订单
      </mt-tab-item>
      <mt-tab-item id="tab-container3">
        <img slot="icon" src="./assets/100x100.png">
        发现
      </mt-tab-item>
      <mt-tab-item id="tab-container4">
        <img slot="icon" src="./assets/100x100.png">
        我的
      </mt-tab-item>
    </mt-tabbar> -->

    <!-- <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="item in list">{{ item }}</li>
    </ul>

    <div>
      <div>
        <img src="./assets/100x100.png" alt="">
      </div>
      <div>
        罗佳瑞
      </div>
    </div> -->


    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { Header } from 'mint-ui';
import { Search } from 'mint-ui';

import { Tabbar, TabItem } from 'mint-ui';
import { TabContainer, TabContainerItem } from 'mint-ui'

import { InfiniteScroll } from 'mint-ui';


export default {
  name: 'app',
  components: {
    HelloWorld,
    InfiniteScroll,
  },
  data() {
    return{
      selected:'',
      active:'tab-container1',
      value:'',

      list:['1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', ]
    }
  }, 
  watch:{
    selected(id){
      this.active=id
    }
  },
  methods:{
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
}

</style>
