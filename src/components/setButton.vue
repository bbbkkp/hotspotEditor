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
            //设备模拟
            if(settype == 'device'){
                this.$store.state.status.ismobile = !this.$store.state.status.ismobile;
                return;
            }
            //视野调整
            if(settype == 'view'){
                let krpano = this.$store.state.krpano;
                krpano.set("layer[view_change_container].visible",true);
                this.$store.state.status.viewbtns = true;
                return;
            }
            //刷新
            else if(settype =='refresh'){
                let date = new Date().getTime();
                this.$store.commit('togglerefresh',date);
                
                return;
            }
            //添加热点
            else if(settype =='add'){
                this.$store.state.status.addhotspot = true;
                console.log('add')
            }
            //编辑已有热点时，未选择热点提示
            else if(settype !=='setting' && !this.$store.state.hotspot){
                this.$Message.warning('请选择热点！');
                return;
            }
            //移动热点
            else if(settype ==='move'){
                let settype = this.$store.state.settype;
                let krpano = this.$store.state.krpano;
                let hsname = this.$store.state.hotspot.name;

                this.$store.state.status.location = true;

                krpano.call("looktohotspot("+hsname+",120);tween(hotspot["+hsname+"].ty,-30,0.2,default,tween(hotspot["+hsname+"].ty,0,0.2))");
                krpano.set("hotspot["+hsname+"].ondown","draghotspot()");
            }
            //不同功能判断
            else if(settype == 'setting'){
                this.$store.state.status.isslidebar = !this.$store.state.status.isslidebar;
            }
            else if(settype !=='setting' && this.$store.state.hotspot && !this.obj.multi){
                this.$store.state.status.modal = true;
                this.$store.state.settype = settype;
            }
            else if(settype !=='setting' && this.$store.state.hotspot && this.obj.multi){
                this.$store.state.status.multimodal = true;
                this.$store.state.settype = settype;
            }
            
        }
    }
}
</script>
<style scoped>
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


