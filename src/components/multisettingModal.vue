<template>
    <Modal v-model="$store.state.status.multimodal" draggable :title="title" @on-ok="okEvent" @on-cancel="cancelEvent">
        <div class="slider" v-for="(item,index) in values" :key="index">
            <span>{{item.subtitle}}</span>
            <Slider :min="item.min" :max="item.max" :step="step" v-model="item.value" @on-input="changeAttribute($event,index)"></Slider>
        </div>
    </Modal>
</template>
<script>
import {Modal,Slider} from 'iview';

const {clipboard} = window.require('electron');
export default {
    name:'multisetmodal',
    data(){
        return {
            title:'',
            values:[],
            prevalues:null,
            min:0,
            max:200,
            step:0.01
        }
    },
    components:{
        Modal,
        Slider,
    },
    computed:{
        _getsettype(){
            return this.$store.state.settype;
        }
    },
    watch:{
        _getsettype(){
            let settype = this.$store.state.settype;
            let krpano = this.$store.state.krpano;
            let hsname = this.$store.state.hotspot.name;
            this.title = settype;

            switch(settype){
                case 'offset':
                    let ox = `hotspot[${hsname}].ox`;
                    let oy = `hotspot[${hsname}].oy`;
                    
                    this.values = [
                        {
                            subtitle:'ox',
                            value: krpano.get(ox) ? parseFloat(krpano.get(ox)):0,
                            min:(krpano.get(ox) ? parseFloat(krpano.get(ox)):0) -2000,
                            max:(krpano.get(ox) ? parseFloat(krpano.get(ox)):0) +2000
                        },
                        {
                            subtitle:'oy',
                            value: krpano.get(oy) ? parseFloat(krpano.get(oy)):0,
                            min:(krpano.get(oy) ? parseFloat(krpano.get(oy)):0)-2000,
                            max:(krpano.get(oy) ? parseFloat(krpano.get(oy)):0)+2000
                        },
                    ];
                break;
                case '3drotate':
                    let rx = `hotspot[${hsname}].rx`;
                    let ry = `hotspot[${hsname}].ry`;
                    let rz = `hotspot[${hsname}].rz`;

                    this.values = [
                        {
                            subtitle:'rx',
                            value:krpano.get(rx) ? parseFloat(krpano.get(rx)):0,
                            min:-360,
                            max:360
                        },
                        {
                            subtitle:'ry',
                            value:krpano.get(ry) ? parseFloat(krpano.get(ry)):0,
                            min:-360,
                            max:360
                        },
                        {
                            subtitle:'rz',
                            value:krpano.get(rz) ? parseFloat(krpano.get(rz)):0,
                            min:-360,
                            max:360
                        }
                    ]
                break;
            };
            //存储预设
            this.prevalues = _.cloneDeep(this.values);
        }
    },
    methods:{
        okEvent(){
            let str = '';
            this.values.map(element=>{
                str += `${element.subtitle}="${element.value}" `;
                
            });

            clipboard.writeText(str);
            this.$Message.success(`已复制 ${str} 属性`);
        },
        //取消设置，恢复初始值
        cancelEvent(){
            let settype = this.$store.state.settype;
            let krpano = this.$store.state.krpano;
            let hsname = this.$store.state.hotspot.name;

            this.prevalues.map(element=>{
                let attr = `hotspot[${hsname}].${element.subtitle}`;
                krpano.set(attr,element.value);
            });

            this.values = _.cloneDeep(this.prevalues);
        },
        changeAttribute(value,index){
            this.values[index].value = value;  //赋值

            let krpano = this.$store.state.krpano;
            let hsname = this.$store.state.hotspot.name;
            let hsattr = `hotspot[${hsname}].${this.values[index].subtitle}`;

            krpano.set(hsattr,value);

        }
    }
}
</script>
<style scoped>
.slider{
    margin:4px 0;
}
</style>


