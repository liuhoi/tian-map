import tmapPolygon from './main';

tmapPolygon.install = function(Vue) {
  Vue.component(tmapPolygon.name, tmapPolygon);
};

export default tmapPolygon;