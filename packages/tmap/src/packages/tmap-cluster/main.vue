<script>
import Vue from "vue";
import markerOverlayCreator from "@/libs/overlay/mapOverlay";
import { MarkerClusterer } from "@/libs/utils/MarkerClusterer";
import { ProxyCluster } from "@/libs/overlay/mapOverlayT";
export default {
  name: "tmapCluster",
  inject: {
    $tmapPromiseLazy: { default: "" },
  },
  props: {
    markers: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    markers: {
      deep: true,
      async handler(val) {
        
        // this.addMarkers(val)
      },
    },
  },
  data() {
    return {
      $tmap: null,
      $tmapComponent: null,
      $mapApi: null,
      tmpVM: null,
      tmpVMC:null
    };
  },
  created() {
    this.tmpVMC = this.initTmpVue({
      position:[104.06, 30.67],
      data:{}
    });
  },
  render() {
    this.tmpVM = this.markers.map((marker) => {
      return this.initTmpVue(marker,this.$scopedSlots.marker());
    });

    console.log(1)
    this.tmpVMC.node = this.$scopedSlots.default({markerNum:this.tmpVMC.markerNum})
    

    return null;
  },
  mounted() {
    this.$tmapPromiseLazy.then(({ map, mapApi }) => {
      this.$tmap = map;
      this.$mapApi = mapApi;
      this.$overlayCreator = markerOverlayCreator(mapApi);
      this.addMarkers(this.tmpVM);
    });
  },

  destroyed() {
    this.removeOverlay();
  },
  methods: {
    addMarkers(arr) {
      let markers = arr.map((data) => {
        return this.initMarker(data);
      });
      new MarkerClusterer(this.$tmap, {
        markers,
        clusterMarker: this.initClusterMarker,
      });
    },
    initMarker(vm) {
      return new ProxyCluster(vm);
    },
    initClusterMarker() {
      return new ProxyCluster(this.tmpVMC);
    },
    removeOverlay() {
      this.$tmapComponent && this.$tmap.removeLayer(this.$tmapComponent);
      this.$tmapComponent = null;
    },
    initTmpVue(marker,node) {
      return new Vue({
        data() {
          return {
            node: node || null,
            markerNum: 0,
            position: marker.position,
            keyData: marker.data,
          };
        },
        render(h) {
          const { node } = this;
          return <div ref="node">{node}</div>;
        },
      }).$mount();
    },
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
