<template>
    <Modal v-model="$store.state.modal" draggable :title="title" @on-ok="okEvent" @on-cancel="cancelEvent">
        <Slider  v-model="value" :min="min" :max="max" :step="step" show-input @on-input="changeAttribute"></Slider>
    </Modal>
</template>
<script>
// import Vue from 'vue'
import {Modal,Slider} from 'iview';
// Vue.prototype.$Message = Message;

const {clipboard} = window.require('electron');
export default {
    name:'settingmodal',
    data(){
        return {
            title:'',
            value:0,
            prevalue:null,
            min:0,
            max:10,
            step:0.01
        }
    },
    components:{
        Modal,
        Slider
    },
    computed:{
        getsettype(){
            return this.$store.state.settype;
        }
    },
    watch:{
        getsettype(){
            let settype = this.$store.state.settype;
            let krpano = this.$store.state.krpano;
            let hsname = this.$store.state.hotspot.name;
            let hsattr = `hotspot[${hsname}].${settype}`;
            this.value = krpano.get(hsattr) >=0 ? parseFloat(krpano.get(hsattr)):0;
            this.title = settype;

            switch(settype){
                case 'scale':
                    this.min = 0;
                    this.max = 10; 
                    this.step = 0.01;   
                break;
                case 'alpha':
                    this.min = 0;
                    this.max = 1;
                    this.step = 0.1;
                break;
                case 'depth':
                    this.min = 0;
                    this.max = 5000;
                    this.step = 1;
                break;
                case 'rotate':
                    this.min = -360;
                    this.max = 360;
                    this.step = 0.01;
                break;
            };
            
            //存储预设值
            this.prevalue = this.value;
        }
                
    },
    methods:{
        //确定事件
        okEvent(){
            let name = this.$store.state.settype;
            let attr = `${name}="${this.value}"`;

            clipboard.writeText(attr);
            this.$Message.success(`已复制 ${attr} 属性`);
            
        },
        cancelEvent(){
            let settype = this.$store.state.settype;
            let krpano = this.$store.state.krpano;
            let hsname = this.$store.state.hotspot.name;

            let attr = `hotspot[${hsname}].${settype}`;
            krpano.set(attr,this.prevalue);
            this.value = this.prevalue;
        },
        //slider滑块事件
        changeAttribute(value){
            let krpano = this.$store.state.krpano;
            let settype = this.$store.state.settype;
            let hsname = this.$store.state.hotspot.name;
            let hsattr = `hotspot[${hsname}].${settype}`;
            
            krpano.set(hsattr,value);
            
        },
    }
}
</script>
<style scoped>
.slider{
    margin:36px 0;
}
</style>


