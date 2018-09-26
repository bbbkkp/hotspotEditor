<template>
    <tooltip placement="left" :content="obj.settype" class="hzindex">
        <div class="setting-btn" :data-settype="obj.settype" :style="{backgroundColor:obj.bgcolor}" @click="setClickEvent($event)">
            <Icon :type="obj.type" :style="{color:obj.color,fontSize:obj.size + 'px'}" />
        </div>
    </tooltip>
</template>
<script>
import { Icon , Tooltip } from 'iview'
export default {
    name:'setbutton',
    props:{
        obj:{
            type:Object,
            default:{
                multi:false
            }
        }
    },
    data(){
        return {
            
        }
    },
    components:{
        Icon,
        Tooltip
    },
    methods:{
        setClickEvent(e){
            let settype = e.currentTarget.dataset.settype;
            if(settype !=='setting' && !this.$store.state.hotspot){
                this.$Message.warning('请选择热点！');
                return;
            }
            else if(settype == 'setting'){
                this.$store.state.status.isslidebar = !this.$store.state.status.isslidebar;
            }
            else if(settype !=='setting' && this.$store.state.hotspot && !this.obj.multi){
                this.$store.state.modal = true;
                this.$store.state.settype = settype;
            }
            else if(settype !=='setting' && this.$store.state.hotspot && this.obj.multi){
                this.$store.state.multimodal = true;
                this.$store.state.settype = settype;
            }
            
        }
    }
}
</script>
<style>
.setting-btn{
  width:40px;
  height:40px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin:6px 0;
  z-index:11；
}
.setting-btn:hover{
    opacity: 0.8;
}
i{
  font-size: 20px;
  color:#fff;
}
</style>


