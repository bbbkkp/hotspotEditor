<template>
	<div class="addhotspotevent-container">
		<div>
			<Button icon="md-checkmark" type="success" @click="okEvent" >确定</Button>
            <Button icon="md-close" type="warning" @click="cancelEvent(-1)" >取消</Button>
			<Button icon="md-color-wand" type="info" @click="addAttributes"  >属性</Button>
            <Button icon="md-code-working" type="primary" @click="addOnClickEvent" >事件</Button>
		</div>
	</div>
</template>
<script>
	import {Button} from 'iview';

    const {clipboard} = window.require('electron');
	export default {
		name:'addhotspotevent',
		data(){
			return {}
		},
		components:{
			Button
		},
		methods:{
			okEvent(){
				let krpano = this.$store.state.krpano,
					hotspot = this.$store.state.hotspot,
					spotobj = {
						name:hotspot.name,
						style:this.$store.state.style,
						ath:hotspot.ath.toFixed(3),
						atv:hotspot.atv.toFixed(3)
					};
					
					let str = `<hotspot name="${spotobj.name}" style="${spotobj.style}" ath="${spotobj.ath}" atv="${spotobj.atv}" />`;
					if(this.$store.state.attributes){
						str = str.split('/>')[0] + this.$store.state.attributes;
					}
					if(this.$store.state.spotevent){
						str = str.split('/>')[0] + this.$store.state.spotevent;
					}
					if(str.indexOf('/>') < 0) str = str + "/>";
					clipboard.writeText(str);
					this.$Message.success('热点属性已复制');

					console.log(str)
					this.cancelEvent();
			},
			cancelEvent(arr){
				let krpano = this.$store.state.krpano,
					name = this.$store.state.hotspot.name;
				this.$store.state.status.eventbus = false;

				//清空参数
				this.$store.commit('setattributes',null);
				this.$store.commit('setspotevent',null);
				if(arr < 0){
					krpano.call("removehotspot("+name+")");
					this.$store.commit('sethotspot','');
				};
				
			},
			//添加事件
			addOnClickEvent(){
				this.$store.state.status.spoteventmodal = true;
			},
			//添加自定义属性
			addAttributes(){
				this.$store.state.status.spotattributemodal = true;
			}
		}
	}
</script>
<style scoped>
.addhotspotevent-container{
	position:fixed;
    top:26px;
    left:50%;
    transform: translateX(-50%);
    z-index:11;
    display: flex;
    color:#fff;
}
button{
	color:#FFF !important;
    margin:0 8px;
}
</style>