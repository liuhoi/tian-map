import tmapPolyline from './main';

tmapPolyline.install = function(Vue) {
  Vue.component(tmapPolyline.name, tmapPolyline);
};

export default tmapPolyline;
export  {tmapPolyline};