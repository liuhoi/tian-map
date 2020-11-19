import tmap from './main';

tmap.install = function(Vue) {
  Vue.component(tmap.name, tmap);
};

export default tmap;