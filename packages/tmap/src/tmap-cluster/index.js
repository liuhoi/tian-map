import tmapCluster from './main';

tmapCluster.install = function(Vue) {
  Vue.component(tmapCluster.name, tmapCluster);
};

export default tmapCluster;
export  {tmapCluster};