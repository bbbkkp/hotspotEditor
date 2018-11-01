<template>
     <tooltip placement="left" :content="obj.settype" class="hzindex">
        <div class="menu-btn" :data-settype="obj.settype" :style="{backgroundColor:obj.bgcolor}" @click="menuClickEvent($event)">
            <Icon :type="obj.type" :style="{color:obj.color,fontSize:obj.size + 'px'}" />
        </div>
    </tooltip>
</template>
<script>
import { Icon , Tooltip } from 'iview'
export default {
    name:'menubutton',
    props:{
        obj:Object
    },
    components:{
        Icon,
        Tooltip
    },
    methods:{
        menuClickEvent(e){
            let settype = e.currentTarget.dataset.settype;
            switch(settype){
                case 'setting':
                    this.$store.state.status.isslidebar = !this.$store.state.status.isslidebar;
                break;
                case 'refresh':
                    let date = new Date().getTime();
                    this.$store.commit('togglerefresh',date);
                break;
                case 'view':
                    let krpano = this.$store.state.krpano;
                    krpano.set("layer[view_change_container].visible",true);
                    this.$store.state.status.viewbtns = true;
                break;
                case 'device':
                    this.$store.state.status.ismobile = !this.$store.state.status.ismobile;
                break;
            }
        }
    }
}
</script>
<style scoped>
.menu-btn{
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
.menu-btn:hover{
    opacity: 0.8;
}
i{
  font-size: 20px;
  color:#fff;
}
</style>


