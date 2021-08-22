class Marker {
  constructor(html,options){
    return new (this.initOverlay())(html,options)
  }
  _initialize (html,options = {}) {
    this.html = html;
    this.lnglat = new T.LngLat(...options.lngLat);
  }
  _onAdd (map) {
    this.map = map;
    this.html.style.position = 'absolute'
    map.getPanes().markerPane.appendChild(this.html);
    this.update();
  }

  _onRemove () {
    let parent = this.html.parentNode;
    if (parent) {
      parent.removeChild(this.html);
      // this.map = null;
      // this.html = null;
    }
  }
  _update () {
    
    var pos = this.map.lngLatToLayerPoint(this.lnglat);
    this.html.style.top =  pos.y  + "px";
    this.html.style.left = pos.x  + "px";
  }
  extendMethods({
    initialize,
    onAdd,
    onRemove,
    update,
    ...methodObjects
  } = {}){
    return {
      initialize:initialize || this._initialize,
      onAdd:onAdd || this._onAdd,
      onRemove:onRemove || this._onRemove,
      update:update || this._update,
      ...methodObjects
    }
  }
  initOverlay(){
    return T.Overlay.extend(this.extendMethods())
  }
}

export {Marker}