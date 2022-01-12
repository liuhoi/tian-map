import tmap from './tmap';
import tmapCardinalArrow from './tmap-cardinal-arrow';
import tmapInfoWindow from './tmap-info-window';
import tmapMarker from './tmap-marker';
import tmapPolygon from './tmap-polygon';
import tmapPolyline from './tmap-polyline';
import tmapCluster from './tmap-cluster';


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

export * from './tmap';
export * from './tmap-cardinal-arrow';
export * from './tmap-info-window';
export * from './tmap-marker';
export * from './tmap-polygon';
export * from './tmap-polyline';
export * from './tmap-cluster';

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