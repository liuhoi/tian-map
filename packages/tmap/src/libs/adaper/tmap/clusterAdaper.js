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
      setText:this.setText
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
    console.log(text,this.Vue)
    this.Vue.markerNum = text
    // this.html.querySelector('.html').innerHTML = text
  }
}


let ProxyCluster = new Proxy(Cluster,{
  construct(target,[html,options]){
    return new target().init(html,options)
  }
})

export {Cluster,ProxyCluster}