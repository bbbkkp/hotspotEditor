<template>
    <div class="view-change-btns" :class="{mobilestyle:$store.state.status.ismobile}">
        <div>
            <Button icon="md-checkmark" type="success" @click="okEvent" >确定</Button>
            <Button icon="md-close" type="warning"@click="cancelEvent" >取消</Button>
        </div>
    </div>
</template>
<script>
import {Button} from 'iview';
const {clipboard} = window.require('electron');
export default {
    name:'viewchange',
    data(){
        return {}
    },
    components:{
        Button
    },
    methods:{
        okEvent(){
            let krpano = this.$store.state.krpano;
            let view = {
                hlookat:krpano.get("view.hlookat").toFixed(3),
                vlookat:krpano.get("view.vlookat").toFixed(3),
                fovtype:"MFOV",
                fov:krpano.get("view.fov").toFixed(3),
            };
            let str = '';
            for(let key in view){
                str += `${key}="${view[key]}" `;
            };
            clipboard.writeText(str);
            this.$Message.success('视角属性已复制');

            this.cancelEvent();
        },
        cancelEvent(){
            let krpano = this.$store.state.krpano;
            krpano.set("layer[view_change_container].visible",false);
            this.$store.state.status.viewbtns = false;

        }
    }
}
</script>
<style scoped>
.view-change-btns{
    position:fixed;
    top:26px;
    left:50%;
    transform: translateX(-50%);
    z-index:11;
    display: flex;
    color:#fff;
}
.mobilestyle{
    top:76px;
}
button{
	color:#FFF !important;
    margin:0 8px;
}
</style>


