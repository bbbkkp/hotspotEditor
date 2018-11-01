<template>
    <div class="choose-file">
        <Button type="primary" size="large" @click="chooseFile">选择文件</Button>
        <div class="tip-text">请选择全景文件夹的路径</div>
    </div>
</template>
<script>
import { Button } from 'iview';

const {dialog} = window.require('electron').remote;

export default {
    name:'choosefile',
    components:{
        Button
    },
    methods:{
        chooseFile(){
            dialog.showOpenDialog(
                {
                    properties:['openDirectory']
                },
                res=>{
                    console.log(res);
                    this.$store.commit('changepath',res[0]);
                    setTimeout(() => {
                        this.$emit('showvtour')
                    }, 10);
                }
            );
        }
    }
}
</script>
<style>
.choose-file{
	width:100%;
	height: 100%;
	position:absolute;
	background: #f8f8f9;
	display: flex;
    flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index:100;
}
.choose-btn{
	padding:10px 30px;
	background:#2d8cf0;
	color:#fff;
	box-sizing: border-box;
	border-radius: 4px;
	cursor: pointer;
}
.tip-text{
    margin:10px 0;
}
</style>


