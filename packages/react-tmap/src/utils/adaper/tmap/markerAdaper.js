import {LngLat} from './apiAdaper'

import {vmFactory} from '../../vmFactory'

const panesType = {
  1:'markerPane',
  2:'infoWindowPane'
}

class Marker {
  constructor(){
    
  }
  _initialize (content,options) {
    this.html = document.createElement('div');
    this.content = content;
    this.panesType = panesType[options.panesType || 1]
    let lnglat = options.position;
    this.lnglat = lnglat instanceof T.dq ? lnglat: new LngLat(...lnglat);
    this.events = []
    this.renderComponent()
    this.keyData = options.keyData
  }
  _onAdd (map) {
    this.map = map;
    this.html.style.position = 'absolute'
    map.getPanes()[this.panesType].appendChild(this.html);
    this.update();
  }

  _onRemove () {
    let panesType = this.map.getPanes()[this.panesType];
    if (panesType) {
      if(panesType.contains(this.html)){
        panesType.removeChild(this.html);
        this.removeEvents();
      }
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
      removeEvents:this.removeEvents
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
  init(content,options){
    return new (this.initOverlay())(content,options)
  }
  getElement(){
    return this.html
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
      panesType.appendChild(this.html);
      this.addEvents();
    }
  }
  setLngLat(lnglat){
    this.lnglat = lnglat instanceof T.dq ? lnglat: new LngLat(...lnglat)
    this.update()
  }
  renderComponent(options){
    vmFactory(this,options)
  }
  addEvent(name,fn){
    
    let event = ()=>{
      fn&&fn(this)
    }

    this.events.push({
      name:event
    })
    this.html.addEventListener(name,event)
  }
  addEvents(){
    this.events.forEach(event => {
      this.html.addEventListener(event.name,event.event)
    })
  }
  removeEvents(){
    this.events.forEach(event => {
      this.html.removeEventListener(event.name,event.event)
    })
  }
  
}

let ProxyMarker = new Proxy(Marker,{
  construct(target,[content,options]){
    return new target().init(content,options)
  }
})

export {Marker,ProxyMarker}