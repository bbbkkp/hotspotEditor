<template>
    <Modal v-model="$store.state.status.spotattributemodal" :mask="false" draggable title="热点属性" @on-ok="okEvent" @on-cancel="cancelEvent">
        <div class="input-container">
            <div class="item-block" v-for="(item,index) in attributelist" :key="index">
                <Input class="input-item" v-model="item.key" placeholder="名称" />=
                <Input class="input-item" v-model="item.value" placeholder="值" />
                <Button class="btn-item" shape="circle" :data-index="index" icon="md-remove" @click="removeItem($event)"></Button>
                <Button class="btn-item" shape="circle" icon="md-add" @click="addItem"></Button>
            </div>
            
        </div>
    </Modal>
</template>
<script>
import {Modal,Input,Button} from 'iview';
const {clipboard} = window.require('electron');
export default {
    name:'spotattributemodal',
    data(){
        return {
            status:true,
            name:'',
            name2:'',
            attributelist:[
                {
                    key:'',
                    value:''
                }
            ]
        }
    },
    components:{
        Modal,
        Input,
        Button
    },
    methods:{
        removeItem(e){
            let index = parseInt(e.currentTarget.dataset.index);
            if(this.attributelist.length > 1){
                this.attributelist.splice(index,1)
            }
        },
        addItem(){
            let obj = {
                key:'',
                value:''
            };
            this.attributelist.push(obj)
        },
        okEvent(){
            let attributes = this.attributelist.filter(element=>element.key !=='' && element.value !== '');
            this.setAttributes(attributes);

             let settype = this.$store.state.settype;
             if(settype == 'attributes'){
                 this.setokEvent(attributes);
             }
             else{
                 this.addokEvent(attributes);
             };

              setTimeout(() => {
                    this.cancelEvent();
                }, 0);
        },
        cancelEvent(){
            this.attributelist = [
                {
                    key:'',
                    value:''
                }
            ];
            this.$store.state.settype = null;
        },
        //通过添加热点设置属性的ok事件
        addokEvent(attributes){
            
            if(attributes.length){
                let _attrs = '';
                attributes.map(element=>{
                    _attrs+= `${element.key}="${element.value}" `
                })
                this.$store.commit('setattributes',_attrs);
            }
        },
        setokEvent(attributes){
            if(attributes.length){
                let _attrs = '';
                attributes.map(element=>{
                    _attrs+= `${element.key}="${element.value}"`
                });
                clipboard.writeText(_attrs);
                this.$Message.success(`已复制 ${_attrs} 属性`);
            }
        },
        setAttributes(attributes){
            let hotspot = this.$store.state.hotspot,
                krpano = this.$store.state.krpano;
            attributes.map(element=>{
                let attr = `hotspot[${hotspot.name}].${element.key}`;
                krpano.set(attr,element.value);
            });
            
        }
    }
}
</script>
<style scoped>
.item-block{
    margin:6px 0;
    display: flex;
    align-items: center;
}
.input-item{
    margin:0 4px;
    flex:1;
}
.btn-item{
    margin:0 2px;
}
</style>


