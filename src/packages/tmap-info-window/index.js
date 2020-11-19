import tmapInfoWindow from './main';

tmapInfoWindow.install = function(Vue) {
  Vue.component(tmapInfoWindow.name, tmapInfoWindow);
};

export default tmapInfoWindow;