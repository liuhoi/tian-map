<script>
import {LngLat} from '../utils/apiAdaper'
export default {
  name: "tmapPolygon",
  inject: {
    $tmapPromiseLazy: { default: '' }
  },
  props: {
    points: {
      type:Array,
      default:()=>[]
    },
    config:{
      type:Object,
      default:()=>{}
    }
  },
  computed:{
    mergeConfig(){
      return {...this.defaultConfig,...this.config}
    }
  },
  watch:{
    points:{
      deep:true,
      async handler(val){
        await this.$tmapPromiseLazy;
        this.initComponent();
      }
    }
  },
  data(){
    return {
      $tmap:null,
      $tmapComponent:null,
      $mapApi : null,
      defaultConfig:{
        color: 'red',
        weight: 3,
        opacity:  1,
        fillColor:  '#FFFFFF',
        fillOpacity: 0
      }
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
    })
  },
  
  destroyed() {
    this.removePolygon();
  },
  methods:{
    initComponent() {
      this.removePolygon();
      let {$tmap,$mapApi,points} = this;
      let lnglats = points.map(point => {
        return new LngLat(...point)
      })
      this.$tmapComponent = new $mapApi.Polygon(lnglats,this.mergeConfig);
      $tmap.addOverLay(this.$tmapComponent);
    },
    removePolygon(){
      this.$tmapComponent && this.$tmap.removeLayer(this.$tmapComponent)
      this.$tmapComponent = null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
