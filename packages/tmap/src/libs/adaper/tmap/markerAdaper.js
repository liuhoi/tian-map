import {LngLat} from './apiAdaper'
import {vmFactory} from '../../utils/vmFactory'

class Marker {
  constructor(){
    
  }
  _initialize (html,options) {
    this.Vue = vmFactory(html,options)
    this.html = this.Vue.$el;
    this.lnglat = new LngLat(...options.position);
  }
  _onAdd (map) {
    this.map = map;
    this.html.style.position = 'absolute'
    map.getPanes().markerPane.appendChild(this.html);
    this.update();
  }

  _onRemove () {
    let markerPane = this.map.getPanes().markerPane;
    if (markerPane) {
      // this.Vue.$destroy();
      markerPane.removeChild(this.html);
      // this.map = null;
      // this.html = null;
    }
  }
  _update () {
    var pos = this.map.lngLatToLayerPoint(this.lnglat);
    this.html.style.top =  pos.y  + "px";
    this.html.style.left = pos.x  + "px";
  }
  extendMethods(){
    return {}
  }
  initOverlay(){
    let cycle = {
      initialize:this._initialize,
      onAdd:this._onAdd,
      onRemove:this._onRemove,
      update:this._update,
    }
    let extendMethods = {...cycle,...this.extendMethods()};
    return T.Overlay.extend(extendMethods)
  }
  init(html,options){
    return new (this.initOverlay())(html,options)
  }
  
}

let ProxyMarker = new Proxy(Marker,{
  construct(target,[html,options]){
    return new target().init(html,options)
  }
})

export {Marker,ProxyMarker}