<script>
import Vue from 'vue';
import {ProxyMarker} from '@/libs/overlay/mapOverlayT'

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
        this.addOverLay();
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
    this.tmpVM = this.initTmpVue()
  },
  render(){
    
    this.tmpVM.node =  this.$scopedSlots.default();

    return null
  },
  mounted(){
    this.$tmapPromiseLazy.then(({map,mapApi}) => {
      this.tmpVM.$tmap = map
      this.tmpVM.$mapApi = mapApi
      this.$tmap = map;
      this.$mapApi = mapApi;
      this.addOverLay();
    })
  },
  
  destroyed() {
    this.tmpVM.$destroy();
    this.removeOverlay();
  },
  methods:{
    initComponent(map,mapApi) {
     
      let {marker} = this;

      this.$tmapComponent = new ProxyMarker( this.tmpVM,{
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
    },
    initTmpVue(){
      return new Vue({
        data() {
          return {
            node: null,
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
