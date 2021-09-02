<script>
import { MarkerClusterer } from "../utils//MarkerClusterer";
import { ProxyCluster } from "../utils//overlay/mapOverlay";
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
    };
  },
  created() {
    
  },
  render() {
    return null;
  },
  mounted() {
    this.$tmapPromiseLazy.then(({ map, mapApi }) => {
      this.$tmap = map;
      this.$mapApi = mapApi;
      this.addMarkers(this.markers);
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
      return new ProxyCluster(this.$scopedSlots.marker,{
        position:vm.position,
        keyData:vm.data
      });
    },
    initClusterMarker() {
      return new ProxyCluster(this.$scopedSlots.default,
      {
        position:[104.06, 30.67],
        data:{}
      });
    },
    removeOverlay() {
      this.$tmapComponent && this.$tmap.removeLayer(this.$tmapComponent);
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
