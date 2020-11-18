
import tmap from './tmap.vue'
import tmapMarker from './tmap-marker.vue'
import tmapInfoWindow from './tmap-info-window.vue'
import tmapPolygon from './tmap-polygon.vue'
import tmapPolyline from './tmap-polyline.vue'
import tmapCardinalArrow from './tmap-cardinal-arrow.vue'

export default {
    install : function(Vue,options){
      Vue.component('tmap',tmap);
      Vue.component('tmapMarker',tmapMarker);  
      Vue.component('tmapInfoWindow',tmapInfoWindow);
      Vue.component('tmapPolygon',tmapPolygon);
      Vue.component('tmapPolyline',tmapPolyline);
      Vue.component('tmapCardinalArrow',tmapCardinalArrow);

    }
}