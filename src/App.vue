<template>
  <div id="app">
    <!--选择文件提示页-->
    <chooseFile v-if="!isvtour" v-on:showvtour="showvtour" />
    <!--侧栏按钮组-->
    <set-button class="setting-switch" :obj="singleset" />
    <slideBar v-if="$store.state.status.isslidebar">
      <set-button v-for="item in setbuttons" :key="item.id" :obj="item" />
    </slideBar>
    <!--全景容器-->
    <vtour v-if="isvtour" />
    <!--热点选择-->
    <hotspotList v-if="$store.state.status.isslidebar" />
    <!--模态窗口-->
    <setModal />
    <multisetModal />
  </div>
</template>
<script>
import Vue from 'vue';
import {Message} from 'iview';
Vue.prototype.$Message = Message;

import chooseFile from './view/chooseFIle';
import vtour from './components/Vtour';
import setButton from './components/setButton';
import slideBar from './components/slideBar';
import hotspotList from './components/hotspotlist';
import setModal from './components/settingModal';
import multisetModal from './components/multisettingModal'
export default {
  name: 'app',
  data(){
    return {
      isvtour:false,
      singleset:{
        settype:'setting',
        type:'ios-settings',
        bgcolor:'transparent',
        color:'#fff',
        size:30
      },
      setbuttons:[
        {
          settype:'scale',
          type:'md-resize',
          bgcolor:'#2db7f5',
        },
        {
          settype:'alpha',
          type:'md-bulb',
          bgcolor:'#ff9900'
        },
        {
          settype:'depth',
          type:'ios-analytics',
          bgcolor:'#19be6b'
        },
        {
          settype:'rotate',
          type:'ios-sync',
          bgcolor:'#BE6D5B'
        },
        {
          settype:'offset',
          type:'md-swap',
          bgcolor:'#9B18CE',
          multi:true
        },
        {
          settype:'3drotate',
          type:'md-cube',
          bgcolor:'#5CCEC7',
          multi:true
        }
      ]
    }
  },
  components: {
    chooseFile,
    vtour,
    setButton,
    slideBar,
    hotspotList,
    setModal,
    multisetModal
  },
  methods:{
    showvtour(){
      this.isvtour = true;
    }
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
	margin:0;
	overflow: hidden;
}
.hzindex{
	z-index:11;
}
.setting-switch{
  position:absolute;
  top:10px;
  right:10px;
}

</style>
