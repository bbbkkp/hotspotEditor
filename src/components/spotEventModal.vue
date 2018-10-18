<template>
	<Modal v-model="$store.state.status.spoteventmodal" draggable title="热点事件" @on-ok="okEvent" @on-cancel="cancelEvent">
		<RadioGroup v-model="event">
			<Radio label="onclick"></Radio>
			<Radio label="onhover"></Radio>
			<Radio label="onover"></Radio>
			<Radio label="onout"></Radio>
			<Radio label="onup"></Radio>
			<Radio label="ondown"></Radio>
			<Radio label="onloaded"></Radio>
    	</RadioGroup>
        <div class="input-container">
            <Input class="input-item" type="textarea" v-model="code" :autosize="true" placeholder="输入代码或已编辑好action名称,如action()" />
        </div>
    </Modal>
</template>
<script>
	import {Modal,Input,RadioGroup,Radio} from 'iview';
	export default {
		name:'spotevent',
		data(){
			return {
				code:"",
				event:'onclick'
			}
		},
		components:{
			Modal,
			Input,
			RadioGroup,
			Radio
		},
		methods:{
			okEvent(){
				let krpano = this.$store.state.krpano,
					hotspot = this.$store.state.hotspot,
					name = hotspot.name,
					event = `hotspot[${hotspot.name}].${this.event}`,
					that = this;
				krpano.set(event,that.code);
				
				let spotevent = `${this.event}="${this.code}" `
				this.$store.commit('setspotevent',spotevent);
				this.cancelEvent();
			},
			cancelEvent(){
				this.code = "",
				this.event = 'onclick'
			}
		}
	}
</script>
<style scoped>
.input-container{
	margin:10px 0;
}
</style>
