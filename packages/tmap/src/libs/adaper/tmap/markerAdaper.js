import {LngLat} from './apiAdaper'

class Marker {
  constructor(){
    
  }
  _initialize (Vue) {
    this.Vue = Vue
    this.html = Vue.$el.cloneNode(true);
    this.lnglat = new LngLat(...Vue.position);
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