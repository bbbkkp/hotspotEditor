<template>
	<div class="addhotspotevent-container">
		<div>
			<Button icon="md-checkmark" type="success" @click="okEvent" >确定</Button>
            <Button icon="md-close" type="warning" @click="cancelEvent(-1)" >取消</Button>
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
						style:hotspot.style,
						ath:hotspot.ath.toFixed(3),
						atv:hotspot.atv.toFixed(3),
						onclick:hotspot.onclick
					};

					let str = `<hotspot name="${spotobj.name}" style="${spotobj.style}" ath="${spotobj.ath}" atv="${spotobj.atv}" onclick="${spotobj.onclick}" />`;
					clipboard.writeText(str);
					this.$Message.success('热点属性已复制');

					this.cancelEvent();
			},
			cancelEvent(arr){
				let krpano = this.$store.state.krpano,
					name = this.$store.state.hotspot.name;
				this.$store.state.status.eventbus = false;
				this.code = "";
				if(arr < 0){
					krpano.call("removehotspot("+name+")");
					this.$store.commit('sethotspot','');
				};
				
			},
			addOnClickEvent(){
				this.$store.state.status.spoteventmodal = true;
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