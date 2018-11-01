<template>
    <Modal v-model="$store.state.status.addhotspot" :mask="false" draggable title="添加热点" @on-ok="okEvent" @on-cancel="cancelEvent">
        <div class="input-container">
            <Input class="input-item" v-model="name" placeholder="热点名称" @on-blur="filerSpotname(name)" />
            <!-- <Input class="input-item" v-model="style" placeholder="热点样式" /> -->
            <Select v-model="style" filterable multiple placeholder="请选择热点样式">
                <Option v-for="item in $store.state.stylelist" :value="item" :key="item">{{item}}</Option>
            </Select>
        </div>
    </Modal>
</template>
<script>
import {Modal,Input,Option,Select} from 'iview'
export default {
    name:'addhotspotmodal',
    data(){
        return {
            value:true,
            name:'',
            style:[]
        }
    },
    components:{
        Modal,
        Input,
        Select,
        Option
    },
    methods:{
        okEvent(){
            let krpano = this.$store.state.krpano;
            if(!isNaN(this.name) || this.name == "" || !this.style.length){
                this.$Message.warning('请输入正确的热点名称或样式名称！');
                
                return;
            }
            let name = this.name,
                style = this.style.join('|'),
                h = krpano.get("view.hlookat"),
                v = krpano.get("view.vlookat");

            this.$store.state.style = style;

            krpano.call("addhotspot("+name+")");
            krpano.call("hotspot["+name+"].loadstyle("+style+")");
            krpano.set("hotspot["+name+"].ath",h);
            krpano.set("hotspot["+name+"].atv",v);
            krpano.set("hotspot["+name+"].ondown","draghotspot()");

            //设置store中hotspot的name,供其他操作
            let hotspot = krpano.get("hotspot["+name+"]");
            this.$store.commit('sethotspot',hotspot);
            this.$store.state.status.eventbus = true;
            
            this.cancelEvent();
        },
        cancelEvent(){
            this.name = "";
            this.style = "";
        },
        filerSpotname(name){
            let krpano = this.$store.state.krpano,
                count = krpano.get("hotspot.count");
                

            for(let i=0;i<count;i++){
                let _name = krpano.get("hotspot["+i+"].name");
                if(name == _name){
                    this.$Message.warning("重名，无效的热点名称！");
                    return;
                }
                
            }

        }
    }
}
</script>
<style scoped>
.input-item{
    padding:6px 0;
}
</style>


