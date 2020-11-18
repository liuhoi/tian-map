<script>
import Vue from 'vue';
import infoWindowOverlayCreator from './overlay/infoWindowOverlay'
import CONSTANTS from './config/constant'

export default {
  name: "tmapInfoWindow",
  inject: {
    $tmapPromiseLazy: { default: '' }
  },
  props: {
    position: {
      type:Array
    },
    visible: {
      type:Boolean
    },
    data: {
      type:Object
    }
  },
  watch:{
    visible(val){
      if(val){
        this.addOverLay()
      }else{
        this.removeOverlay()
      }
     
    },
    data:{
      deep:true,
      handler(val){
        if(!this.visible){
          return 
        }
        if(this.$tmapComponent){
          this.removeOverlay()
          this.addOverLay()
        }else{
          this.addOverLay()
        }
        
      }
    }
  },
  data(){
    return {
      $tmap:null,
      $tmapComponent:null,
      $mapApi : null,
      $overlayCreator:null
    }
  },
  created(){
    this.tmpVM = new Vue({
      data() {
        return {node: ''};
      },
      render(h) {
        const {node} = this;
        return (
          <div ref='node'>
            {node}
          </div>
        )
      }
    }).$mount();
  },
  render(){
    const slot = this.$scopedSlots.default();
    if(slot && slot.length){
      this.tmpVM.node = slot;
    }
    return null
  },
  mounted(){
    this.$tmapPromiseLazy.then(({map,mapApi}) => {
      this.$tmap = map;
      this.$mapApi = mapApi;
      this.$overlayCreator = infoWindowOverlayCreator(mapApi);
    })
    // this.$on(CONSTANTS.TMAP_READY_EVENT,(map,mapApi)=>{ 
    //   this.$tmap = map;
    //   this.$mapApi = mapApi;
    //   this.$overlayCreator = infoWindowOverlayCreator(mapApi);
    // })
  },
  
  destroyed() {
    this.removeOverlay();
    this.tmpVM.$destroy();
  },
  methods:{
    initComponent(map,mapApi) {
      let {$overlayCreator} = this;
      this.$tmapComponent = new $overlayCreator( this.tmpVM.$refs.node,{
        lngLat:this.position,
        data:this.data,
      });
      this.$tmap.addOverLay(this.$tmapComponent)
    },
    addOverLay(){
      this.initComponent(this.$tmap,this.$mapApi);
    },
    removeOverlay(){
      this.$tmapComponent && this.$tmap.removeLayer(this.$tmapComponent)
      this.$tmapComponent = null;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
