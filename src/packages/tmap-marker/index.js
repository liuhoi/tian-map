import tmapMarker from './main';

tmapMarker.install = function(Vue) {
  Vue.component(tmapMarker.name, tmapMarker);
};

export default tmapMarker;