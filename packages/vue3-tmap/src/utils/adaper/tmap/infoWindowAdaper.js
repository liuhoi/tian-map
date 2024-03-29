import {Marker} from './markerAdaper'
import {LngLat} from './apiAdaper'


class InfoWindow extends Marker{
  constructor(){
    super()
  }
  _onAdd (map) {
    this.map = map;
    this.html.style.position = 'absolute'
    map.getPanes().infoWindowPane.appendChild(this.html);
    this.update();
  }
  _onRemove () {
    let infoWindowPane = this.map.getPanes().infoWindowPane;
    if (infoWindowPane) {
      if(infoWindowPane.contains(this.html)){
        infoWindowPane.removeChild(this.html);
      }
      // this.Vue.$destroy();
     
      // this.map = null;
      // this.html = null;
    }
  }
  extendMethods(){
    return {
      hide:this.hide,
      show:this.show,
      setLngLat:this.setLngLat,
      setData:this.setData
    }
  }
  hide(){
    this.onRemove()
  }
  show(lnglat,data){
    let infoWindowPane = this.map.getPanes().infoWindowPane;
    if (infoWindowPane) {
      infoWindowPane.appendChild(this.html);
      this.setData(data || {})
      this.setLngLat(lnglat)
    }
  }
  setLngLat(lnglat){
    this.lnglat = lnglat instanceof T.dq ? lnglat: new LngLat(...lnglat)
    this.Vue.reactiveData.position = lnglat
    this.update()
  }
  setData(data){
    this.Vue.reactiveData.keyData = data
  }
}


let ProxyInfoWindow = new Proxy(InfoWindow,{
  construct(target,[html,options]){
    return new target().init(html,options)
  }
})

export {InfoWindow,ProxyInfoWindow}