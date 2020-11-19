<template>
  <div class="tmap">
   <slot></slot>
   <div class="map-container" ref="tmap"></div>
  </div>
</template>

<script>
import Emitter from '@/libs/mixins/emitter'
import CONSTANTS from '@/libs/config/constant'
import loadTmapApi from '@/libs/utils/initializer'
import promiseLazyFactory from '@/libs/utils/promise-lazy'

import config from '@/libs/config/map';

const promiseLazyCreator  = promiseLazyFactory(loadTmapApi)
const tmapApiPromiseLazy = promiseLazyCreator({
  tk: CONSTANTS.TMAP_KEY,
});



export default {
  name: "tmap",
  mixins:[Emitter],
  props: {
    center:{
      type:Array,
      default:()=>[config.deFaultLng,config.deFaultLat]
    },
    zoom:{
      type:[Number,String],
      default:config.zoom
    },
  },
  provide () {
    this.$tmapPromiseLazy = new Promise((resolve, reject) => {
      this.$mapPromiseDeferred = { resolve, reject }
    })
    return {
      $tmapPromiseLazy: this.$tmapPromiseLazy
    }
  },
  watch:{
    center([lng,lat]){
      this.$tmap.panTo(new this.$mapApi.LngLat(lng, lat),this.zoom);
    },
    zoom(val){
      let [lng, lat] = this.center;
      this.$tmap.panTo(new this.$mapApi.LngLat(lng, lat),val);
    }
  },
  data(){
    return {
      $tmap:null,
      $mapApi:null,
      $mapPromiseDeferred:null,
      $tmapPromiseLazy:null
    }
  },
  mounted(){
    tmapApiPromiseLazy().then(mapApi => {
      this.$mapApi = mapApi;
      this.initMap(mapApi)
      // this.broadcast('tmapMarker',CONSTANTS.TMAP_READY_EVENT,[this.$tmap,mapApi])
      // this.broadcast('tmapInfoWindow',CONSTANTS.TMAP_READY_EVENT,[this.$tmap,mapApi])
    })
  },
  methods:{
    initMap(mapApi){
      let {
        tileUrl,
        fontLayerUrl,
        minZoom,
        maxZoom,
        zoom,
        deFaultLng,
        deFaultLat
      } = config;

      let tile = new mapApi.TileLayer(tileUrl)
      let fontLayer = new mapApi.TileLayer(fontLayerUrl)
      let layConfig = {
        layers: [tile, fontLayer],
        minZoom,
        maxZoom,
        zoom,
        center: new mapApi.LngLat(deFaultLng, deFaultLat)
      }
      
      //初始化地图对象
      this.$tmap = new mapApi.Map(this.$refs.tmap, layConfig);
      this.$mapPromiseDeferred.resolve({map:this.$tmap,mapApi})
    },
    markerCenterAndZoom([lng,lat] = [],offset = 300){
      let getZoom = this.$tmap.getZoom();
      var pointer = this.$tmap.lngLatToLayerPoint({lat,lng});
      pointer.y -= offset;
      let center = this.$tmap.layerPointToLngLat(pointer);
      this.$tmap.panTo(center,getZoom);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tmap{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  // /deep/ * {
  //   box-sizing: content-box;
  // }
  ::v-deep .tdt-bottom.tdt-left{
    display: none;
  }
  .map-container{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
}
</style>
