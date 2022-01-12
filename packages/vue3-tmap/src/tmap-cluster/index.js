import tmapCluster from './TmapCluster.vue';

tmapCluster.install = function(Vue) {
  Vue.component(tmapCluster.name, tmapCluster);
};

export default tmapCluster;
export  {tmapCluster};