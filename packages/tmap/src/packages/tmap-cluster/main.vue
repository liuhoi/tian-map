<script>
import Vue from 'vue';
import markerOverlayCreator from '@/libs/overlay/mapOverlay'
import CONSTANTS from '@/libs/config/constant'

export default {
  name: "tmapCluster",
  inject: {
    $tmapPromiseLazy: { default: '' }
  },
  props: {
    markers: {
      type:Array,
      default:()=>[]
    }
  },
  watch:{
    markers:{
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
      $overlayCreator:null,
    }
  },
  created(){
    this.tmpVM = new Vue({
      data() {
        return {
          node: '',
          $tmap:null,
          $mapApi:null
        };
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
    return null
  },
  mounted(){
    this.$tmapPromiseLazy.then(({map,mapApi}) => {
      this.tmpVM.$tmap = map
      this.tmpVM.$mapApi = mapApi
      this.$tmap = map;
      this.$mapApi = mapApi;
      this.$overlayCreator = markerOverlayCreator(mapApi);
    })
  },
  
  destroyed() {
    this.tmpVM.$destroy();
    this.removeOverlay();
  },
  methods:{
    initComponent(map,mapApi) {
     
      let {$overlayCreator,marker} = this;
      this.$tmapComponent = new $overlayCreator( this.tmpVM.$refs.node,{
        lngLat:marker.position,
        data:marker.data
      });
      map.addOverLay(this.$tmapComponent);
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
