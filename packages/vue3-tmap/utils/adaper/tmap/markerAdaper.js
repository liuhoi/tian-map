import {LngLat} from './apiAdaper'
import {vmFactory} from '../../vmFactory'

const panesType = {
  1:'markerPane',
  2:'infoWindowPane'
}

class Marker {
  constructor(){
    
  }
  _initialize (html,options) {
    this.contentWrapper = document.createElement('div');
    this.content = html;
    this.panesType = panesType[options.panesType || 1]
    let lnglat = options.position;
    this.lnglat = lnglat instanceof T.dq ? lnglat: new LngLat(...lnglat);
    this.keyData = options.keyData || {}
    this.contentWrapper.classList.add('tmap-marker');
    if(this.panesType == 'infoWindowPane'){
      this.contentWrapper.classList.add('tmap-infowindow');
    }

    this.renderComponent({
      markerNum:0
    })
  }
  _onAdd (map) {
    this.map = map;
    this.contentWrapper.style.position = 'absolute'
    map.getPanes().markerPane.appendChild(this.contentWrapper);
    this.update();
  }

  _onRemove () {
    
    let markerPane = this.map.getPanes().markerPane;
    if (markerPane) {
      if(markerPane.contains(this.contentWrapper)){
        markerPane.removeChild(this.contentWrapper);
      }
    }
  }
  _update () {
    var pos = this.map.lngLatToLayerPoint(this.lnglat);
    this.contentWrapper.style.top =  (pos.y- 36)  + "px";
    this.contentWrapper.style.left = (pos.x - 11) + "px";
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
      renderComponent:this.renderComponent,
      getElement:this.getElement
    }
    let extendMethods = {...cycle,...this.extendMethods()};
    return T.Overlay.extend(extendMethods)
  }
  renderComponent(options = {}){
    vmFactory(this,options)
  }
  init(html,options){
    return new (this.initOverlay())(html,options)
  }
  getElement(){
    return this.contentWrapper
  }
  
}

let ProxyMarker = new Proxy(Marker,{
  construct(target,[html,options]){
    return new target().init(html,options)
  }
})

export {Marker,ProxyMarker}