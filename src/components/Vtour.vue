<template>
    <div :class="{mobile:$store.state.status.ismobile,landscape:islandscape}">
        <div id="pano"></div>
        <Button v-if="$store.state.status.ismobile" shape="circle" class="rotate-btn" icon="md-sync" @click="toggleLandscape"></Button>
    </div>
</template>
<script>
import {Button} from 'iview';
export default {
    name:'vtour',
    data(){
        return {
            islandscape:false
        }
    },
    mounted(){
        this.loadPano();
    },
    components:{
        Button
    },
    computed:{
        _getRefresh(){
            return this.$store.state.status.refresh;
        }
    },
    watch:{
        _getRefresh(){
            this.loadPano();
            
        }
    },
    methods:{
        //加载全景
        loadPano(){
            // console.log(this.$store.state.filepath);
            let root  = this.$store.state.filepath;
            let xml_src = root + "\\tour.xml";
            let swf_src = root + "\\tour.swf";
            
            //清除子元素
            let div = document.getElementById('pano');
            while(div.hasChildNodes()){
                div.removeChild(div.firstChild)
            };

            embedpano({swf:swf_src, xml:xml_src, target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});
            setTimeout(() => {
                let krpano = document.getElementById("krpanoSWFObject");
                this.$store.commit('setKrpano',krpano);
            }, 100);
        },
        toggleLandscape(){
            this.islandscape = !this.islandscape;
        }
    }
}
</script>
<style>
#pano{
    width:100%;
    height:100%;
    position: absolute;
}
.mobile{
    width:375px;
    height:667px;
    position:absolute;
    left:50%;
    top:50px;
    border:1px solid #989898;
    box-sizing:border-box;
    box-shadow:0 4px 18px -2px #b3b3b3;
    transform:translateX(-50%)
}
.landscape{
    height:375px;
    width:667px;
}
.rotate-btn{
    position: fixed;
    top:-40px;
    left:50%;
    transform:translateX(-50%);
}
</style>



