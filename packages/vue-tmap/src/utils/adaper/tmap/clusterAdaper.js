import {Marker} from './markerAdaper'
import {LngLat} from './apiAdaper'


class Cluster extends Marker{
  constructor(){
    super()
  }
  extendMethods(){
    return {
      getPosition:this.getPosition,
      hide:this.hide,
      show:this.show,
      setLngLat:this.setLngLat,
      setText:this.setText,
      getElement:this.getElement
    }
  }
  getPosition(){
    return this.lnglat
  }
  hide(){
    this.onRemove()
  }
  show(){
    let markerPane = this.map.getPanes().markerPane;
    if (markerPane) {
      markerPane.appendChild(this.html);
    }
  }
  setLngLat(lnglat){
    this.lnglat = lnglat
    this.update()
  }
  setText(text){
    this.Vue.markerNum = text
  }
  getElement(){
    return this.html
  }
}


let ProxyCluster = new Proxy(Cluster,{
  construct(target,[html,options]){
    return new target().init(html,options)
  }
})

export {Cluster,ProxyCluster}