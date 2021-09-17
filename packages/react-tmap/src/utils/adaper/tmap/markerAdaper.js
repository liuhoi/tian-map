import {LngLat} from './apiAdaper'

import {vmFactory} from '../../vmFactory'

const panesType = {
  1:'markerPane',
  2:'infoWindowPane'
}

class Marker {
  constructor(){
    
  }
  _initialize (content,options,events = {}) {
    this.contentWrapper = document.createElement('div');
    this.content = content;
    this.panesType = panesType[options.panesType || 1]
    let lnglat = options.position;
    this.lnglat = lnglat instanceof T.dq ? lnglat: new LngLat(...lnglat);
    this.events = []
    this.keyData = options.keyData || {}

    this.contentWrapper.classList.add('tmap-marker');
    if(this.panesType == 'infoWindowPane'){
      this.contentWrapper.classList.add('tmap-infowindow');
    }
    this.initEvent(events);
    this.renderComponent();
    
  }
  _onAdd (map) {
    this.map = map;
   
    this.contentWrapper.style.position = 'absolute'
    map.getPanes()[this.panesType].appendChild(this.contentWrapper);
    this.update();
    this.addEvents();
  }

  _onRemove () {
    let panesType = this.map.getPanes()[this.panesType];
    if (panesType) {
      if(panesType.contains(this.contentWrapper)){
        panesType.removeChild(this.contentWrapper);
        this.removeEvents();
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
  _extendMethods(){
    return {
      getElement:this.getElement,
      getPosition:this.getPosition,
      hide:this.hide,
      show:this.show,
      setLngLat:this.setLngLat,
      renderComponent:this.renderComponent,
      addEvents:this.addEvents,
      addEvent:this.addEvent,
      removeEvents:this.removeEvents,
      initEvent:this.initEvent
    }
  }
  initOverlay(){
    let cycle = {
      initialize:this._initialize,
      onAdd:this._onAdd,
      onRemove:this._onRemove,
      update:this._update,
    }
    let extendMethods = {...cycle,...this._extendMethods(),...this.extendMethods()};
    return T.Overlay.extend(extendMethods)
  }
  init(content,options,events){
    return new (this.initOverlay())(content,options,events)
  }
  getElement(){
    return this.contentWrapper
  }
  getPosition(){
    return this.lnglat
  }
  hide(){
    this.onRemove()
  }
  show(){
    let panesType = this.map.getPanes()[this.panesType];
    if (panesType) {
      panesType.appendChild(this.contentWrapper);
    }
  }
  setLngLat(lnglat){
    this.lnglat = lnglat instanceof T.dq ? lnglat: new LngLat(...lnglat)
    this.update()
  }
  renderComponent(options = {}){
    vmFactory(this,options)
  }
  initEvent(events){
    if(Object.keys(events).length){
      Object.keys(events).forEach(name => {
        this.events.push({
          name,
          event:() => {events[name](this)}
        })
      })
    }
  }
  addEvents(){
    this.events.forEach(event => {
      this.contentWrapper.addEventListener(event.name,event.event)
    })
  }
  removeEvents(){
    this.events.forEach(event => {
      this.contentWrapper.removeEventListener(event.name,event.event)
    })
  }
  
}

let ProxyMarker = new Proxy(Marker,{
  construct(target,[content,options,events]){
    return new target().init(content,options,events)
  }
})

export {Marker,ProxyMarker}