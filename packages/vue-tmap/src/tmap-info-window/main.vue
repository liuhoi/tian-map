<script>
import {ProxyInfoWindow} from '../utils/overlay/mapOverlayT'

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
      console.log(val)
      if(val){
        this.$tmapComponent.show()
      }else{
        this.$tmapComponent.hide()
      }
     
    },
    data:{
      deep:true,
      handler(val){
        // if(!this.visible){
        //   return 
        // }
        // if(this.$tmapComponent){
        //   this.removeOverlay()
        //   this.addOverLay()
        // }else{
        //   this.addOverLay()
        // }
        
      }
    }
  },
  data(){
    return {
      $tmap:null,
      $tmapComponent:null,
      $mapApi : null
    }
  },
  created(){
    
  },
  render(){
    return null
  },
  mounted(){
    this.$tmapPromiseLazy.then(({map,mapApi}) => {
      this.$tmap = map;
      this.$mapApi = mapApi;
      this.initComponent();
      if(this.visible){
        this.$tmapComponent.show()
      }else{
        this.$tmapComponent.hide()
      }
    })
  },
  
  destroyed() {
    this.removeOverlay();
  },
  methods:{
    initComponent() {
      this.$tmapComponent = this.initMarker();
      this.$tmap.addOverLay(this.$tmapComponent);
    },
    initMarker(){
      return new ProxyInfoWindow( this.$scopedSlots.default,{
        position:this.position,
        keyData:this.data
      })
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
