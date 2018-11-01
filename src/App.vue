<template>
  <div id="app">
    <!--选择文件提示页-->
    <chooseFile v-if="!isvtour" v-on:showvtour="showvtour" />
    <!--热点位置显示-->
    <spotLocation v-if="$store.state.status.location" />
    <!--热点中间事件-->
    <hotspotEventBus v-if="$store.state.status.eventbus" />
    <viewChange v-if="$store.state.status.viewbtns" />
    <!--侧栏按钮组-->
    <menu-button class="device-btn" :obj="device" />
    <menu-button class="view-btn" :obj="viewset" />
    <menu-button class="refresh-btn" :obj="refreshset" />
    <menu-button class="setting-switch" :obj="singleset" />
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
    <addHotspot />
    <spotEventModal />
    <spotAttributeModal />
  </div>
</template>
<script>
import Vue from 'vue';
import {Message} from 'iview';
Vue.prototype.$Message = Message;

import chooseFile from './view/chooseFIle';
import vtour from './components/Vtour';
import setButton from './components/setButton';
import menuButton from './components/menuButton';
import slideBar from './components/slideBar';
import hotspotList from './components/hotspotlist';
import setModal from './components/settingModal';
import multisetModal from './components/multisettingModal';
import spotLocation from './components/hotspotLocation';
import addHotspot from './components/addhotspotModal';
import hotspotEventBus from './components/addhotspotEvent';
import spotEventModal from './components/spotEventModal';
import spotAttributeModal from './components/spotAttributeModal';
import viewChange from './components/viewchange';

export default {
  name: 'app',
  data(){
    return {
      isvtour:false,
      device:{
        settype:'device',
        type:'md-phone-portrait',
        color:'#ed4014',
        size:26
      },
      viewset:{
        settype:'view',
        type:'md-eye',
        bgcolor:'transparent',
        color:'#ed4014',
        size:30
      },
      refreshset:{
        settype:"refresh",
        type:"ios-refresh",
        bgcolor:"transparent",
        color:"#ed4014",
        size:38
      },
      singleset:{
        settype:'setting',
        type:'ios-settings',
        bgcolor:'transparent',
        color:'#ed4014',
        size:30
      },
      setbuttons:[
        {
          settype:'add',
          type:'md-add',
          bgcolor:'#40D26B'
        },
        {
          settype:'move',
          type:'md-hand',
          bgcolor:'#EC0E5B'
        },
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
    menuButton,
    slideBar,
    hotspotList,
    setModal,
    multisetModal,
    spotLocation,
    addHotspot,
    hotspotEventBus,
    spotEventModal,
    spotAttributeModal,
    viewChange
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
  background-color: #f9f9f9 !important;
	overflow: hidden;
}
.hzindex{
	z-index:11;
}
.setting-switch{
  position:fixed;
  top:10px;
  right:10px;
}
.refresh-btn{
  position:fixed;
  top:11px;
  right:50px;
}
.view-btn{
  position:fixed;
  top:11px;
  right:90px;
}
.device-btn{
  position:fixed;
  top:11px;
  right:130px;
}

</style>
