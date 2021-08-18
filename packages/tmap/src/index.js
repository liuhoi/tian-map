import tmap from '@/packages/tmap';
import tmapCardinalArrow from '@/packages/tmap-cardinal-arrow';
import tmapInfoWindow from '@/packages/tmap-info-window';
import tmapMarker from '@/packages/tmap-marker';
import tmapPolygon from '@/packages/tmap-polygon';
import tmapPolyline from '@/packages/tmap-polyline';
import tmapCluster from '@/packages/tmap-cluster';


const components = [
  tmap,
  tmapCardinalArrow,
  tmapInfoWindow,
  tmapMarker,
  tmapPolygon,
  tmapPolyline,
  tmapCluster

];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.0.1',
  install,
  tmap,
  tmapCardinalArrow,
  tmapInfoWindow,
  tmapMarker,
  tmapPolygon,
  tmapPolyline,
  tmapCluster

};
