<script>
import Vue from 'vue';
import markerOverlayCreator from '@/libs/overlay/mapOverlay'
import {MarkerClusterer} from '@/libs/utils/MarkerClusterer'
import {ProxyCluster} from '@/libs/overlay/mapOverlayT'
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
        // this.addMarkers(val)
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
    this.tmpVM = this.initTmpVue();
    this.tmpVMC = this.initTmpVue();
  },
  render(){
    this.tmpVM.node = this.$scopedSlots.marker() || '';
    this.tmpVMC.node = this.$scopedSlots.default()
    return null
  },
  mounted(){
    this.$tmapPromiseLazy.then(({map,mapApi}) => {
      this.$tmap = map;
      this.$mapApi = mapApi;
      this.$overlayCreator = markerOverlayCreator(mapApi);
      this.addMarkers(this.markers)
    })
  },
  
  destroyed() {
    this.removeOverlay();
  },
  methods:{
    addMarkers(arr){
      let markers = arr.map(data => {
        return this.initMarker(data)
      })
      new MarkerClusterer(this.$tmap,{
        markers,
        clusterMarker:this.initClusterMarker
      })
    },
    initMarker(data){
      return new ProxyCluster(this.tmpVM,{
        lngLat:data.position,
        data:data.data||{}
      })
    },
    initClusterMarker(){
      return new ProxyCluster(this.tmpVMC,{
        lngLat:[104.06, 30.67],
        data:{}
      })
    },
    removeOverlay(){
      this.$tmapComponent && this.$tmap.removeLayer(this.$tmapComponent)
      this.$tmapComponent = null;
    },
    initTmpVue(){
      return new Vue({
        data() {
          return {
            node: null,
            markerNum:0
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
