<template>
    <div class="spotlocation-container">
        <div>
            <Button icon="md-checkmark" type="success" class="spot-end" @click="spotFinishEvent" >确定</Button>
            <Button icon="md-close" type="warning" class="spot-end" @click="spotCancelEvent" >取消</Button>
        </div>
    </div>
</template>
<script>
import {Button} from 'iview';

const {clipboard} = window.require('electron');

export default {
    name:'hotspotlocation',
    data(){
        return {}
    },
    components:{
        Button
    },
    methods:{
        spotFinishEvent(){
            let settype = this.$store.state.settype;
            let krpano = this.$store.state.krpano;
            let hsname = this.$store.state.hotspot.name;
                
            let location = {
                ath:parseFloat(krpano.get("hotspot["+hsname+"].ath")).toFixed(3),
                atv:parseFloat(krpano.get("hotspot["+hsname+"].atv")).toFixed(3)
            };

            let str = `ath="${location.ath}" atv="${location.atv}"`;
            clipboard.writeText(str);
            this.$Message.success(`已复制 ${str} 属性`);

            setTimeout(() => {
                this.spotCancelEvent();
            }, 0);
            
        },
        spotCancelEvent(){
            let settype = this.$store.state.settype;
            let krpano = this.$store.state.krpano;
            let hsname = this.$store.state.hotspot.name;
            
            krpano.set("hotspot["+hsname+"].ondown","");
            this.$store.state.status.location = false;

        }
    }
}
</script>
<style scoped>
.spotlocation-container{
    position:fixed;
    top:26px;
    left:50%;
    transform: translateX(-50%);
    z-index:11;
    display: flex;
    color:#fff;
}

.spot-end{
    color:#FFF !important;
    margin:0 8px;
}


</style>


