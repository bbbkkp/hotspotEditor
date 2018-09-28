<template>
    <div id="pano"></div>
</template>
<script>
export default {
    name:'vtour',
    mounted(){
        this.loadPano();
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
        }
    }
}
</script>
<style>
#pano{
    width:100%;
    height:100%;
    position:absolute;
}
</style>



