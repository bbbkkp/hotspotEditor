<template>
    <div class="hotspotlist">
        <div class="title">热点列表</div>
        <Select v-model="model" style="width:200px" @on-change="selectChange">
            <Option v-for="(item,index) in hotspotlist" :value="item" :key="index" >{{ item }}</Option>
        </Select>
    </div>
</template>
<script>
import {Select, Option } from 'iview';
export default {
    name:'hotspotlist',
    data(){
        return {
            hotspotlist:[],
            model:''
        }
    },
    components:{
        Select,
        Option
    },
    mounted(){
        setTimeout(()=>{
            this.gethotspotList();
        },100);
    },
    methods:{
        gethotspotList(){
            let krpano = this.$store.state.krpano;
            let count = krpano.get("hotspot.count");
            for(let i=0;i<count;i++){
                let hotspot = krpano.get("hotspot["+i+"]")
                if(hotspot.visible){
                    this.hotspotlist.push(hotspot.name)
                }
            };
        },
        selectChange(value){
            let krpano = this.$store.state.krpano;
            let hotspot = krpano.get("hotspot["+value+"]");
            krpano.call("tween(hotspot["+value+"].ty,-30,0.2,default,tween(hotspot["+value+"].ty,0,0.2))");
            this.$store.commit('sethotspot',hotspot);
            
        }
    }
}
</script>
<style scoped>
.hotspotlist{
    position:absolute;
    top:10px;
    left:10px;
    color:#fff;
}
.title{
    padding:4px 2px;
    color:#515a6e;
}
</style>


