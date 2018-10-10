<template>
	<Modal v-model="$store.state.status.spoteventmodal" draggable title="热点onclick" @on-ok="okEvent" @on-cancel="cancelEvent">
        <div class="input-container">
            <Input class="input-item" type="textarea" v-model="code" :autosize="true" placeholder="输入代码或已编辑好action名称,如action()" />
        </div>
    </Modal>
</template>
<script>
	import {Modal,Input} from 'iview';
	export default {
		name:'spotevent',
		data(){
			return {
				code:""
			}
		},
		components:{
			Modal,
			Input
		},
		methods:{
			okEvent(){
				let krpano = this.$store.state.krpano,
					hotspot = this.$store.state.hotspot,
					name = hotspot.name,
					that = this;
				krpano.set("hotspot["+name+"].onclick",that.code);

				
				this.cancelEvent();
			},
			cancelEvent(){
				this.code = ""
			}
		}
	}
</script>