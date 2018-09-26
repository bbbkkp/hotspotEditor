<template>
    <div id="pano"></div>
</template>
<script>
export default {
    name:'vtour',
    mounted(){
        // console.log(this.$store.state.filepath);
        let root  = this.$store.state.filepath;
        let xml_src = root + "\\tour.xml";
        let swf_src = root + "\\tour.swf";

        embedpano({swf:swf_src, xml:xml_src, target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});
        setTimeout(() => {
            let krpano = document.getElementById("krpanoSWFObject");
            this.$store.commit('setKrpano',krpano);
        }, 100);

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



