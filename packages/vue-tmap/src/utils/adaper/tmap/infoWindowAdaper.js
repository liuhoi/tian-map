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
      // this.Vue.$destroy();
      infoWindowPane.removeChild(this.html);
      // this.map = null;
      // this.html = null;
    }
  }
  extendMethods(){
    return {
      hide:this.hide,
      show:this.show,
    }
  }
  hide(){
    this.onRemove()
  }
  show(){
    let infoWindowPane = this.map.getPanes().infoWindowPane;
    if (infoWindowPane) {
      infoWindowPane.appendChild(this.html);
    }
  }
}


let ProxyInfoWindow = new Proxy(InfoWindow,{
  construct(target,[html,options]){
    return new target().init(html,options)
  }
})

export {InfoWindow,ProxyInfoWindow}