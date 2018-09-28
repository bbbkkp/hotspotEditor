import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    krpano:null,
    hotspot:null,
    settype:'',
    modal:false,
    multimodal:false,
    filepath:"",
    status:{
      isslidebar:false,
      refresh:0,
      location:false
    }

  },
  mutations: {
    changepath(state,path){
      state.filepath = path;
    },
    setKrpano(state,krpano){
      state.krpano = krpano
    },
    sethotspot(state,hotspot){
      state.hotspot = hotspot;
    },
    togglerefresh(state,date){
      state.status.refresh = date;
    }
  },
  actions: {

  }
})
