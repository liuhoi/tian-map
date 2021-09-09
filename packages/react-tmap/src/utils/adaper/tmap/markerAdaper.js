import {LngLat} from './apiAdaper'

class Marker {
  constructor(){
    
  }
  _initialize (html,options) {
    // this.Vue = vmFactory(html,options)
    this.html = html;
    let lnglat = options.position;
    this.lnglat = lnglat instanceof T.dq ? lnglat: new LngLat(...lnglat);
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
      if(markerPane.contains(this.html)){
        markerPane.removeChild(this.html);
      }
      // this.Vue.$destroy();
      // this.map = null;
      // this.html = null;
    }
  }
  _update () {
    var pos = this.map.lngLatToLayerPoint(this.lnglat);
    this.html.style.top =  (pos.y- 36)  + "px";
    this.html.style.left = (pos.x - 11) + "px";
  }
  _clickMarker(){
    return {
      keyData:this.keyData,
      lnglat:this.lnglat
    }
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
    console.log(target,html,options)
    return new target().init(html,options)
  }
})

export {Marker,ProxyMarker}