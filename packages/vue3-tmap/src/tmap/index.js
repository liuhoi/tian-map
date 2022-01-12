import tmap from './Tmap.vue';

tmap.install = function(Vue) {
  Vue.component(tmap.name, tmap);
};

export default tmap;
export  {tmap};