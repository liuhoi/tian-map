<script>
import {ProxyMarker} from '../utils/overlay/mapOverlay'

export default {
  name: "tmapMarker",
  inject: {
    $tmapPromiseLazy: { default: '' }
  },
  props: {
    marker: {
      type:Object,
      default:()=>{}
    }
  },
  watch:{
    marker:{
      deep:true,
      handler(val){
       
       
      }
    }
    
  },
  data(){
    return {
      $tmap:null,
      $tmapComponent:null,
      $mapApi : null,
    }
  },
  render(){
    return null
  },
  mounted(){
    this.$tmapPromiseLazy.then(({map,mapApi}) => {
      this.$tmap = map;
      this.$mapApi = mapApi;
      this.initComponent();
    })
  },
  
  unmounted() {
    this.removeOverlay();
    
  },
  methods:{
    initComponent() {
      this.$tmapComponent = this.initMarker();
      this.$tmap.addOverLay(this.$tmapComponent);
    },
    initMarker(){
      return new ProxyMarker( this.$slots.default,{
        position:this.marker.position,
        keyData:this.marker.data
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

</style>
