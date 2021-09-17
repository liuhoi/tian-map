import {Marker} from './markerAdaper'
class InfoWindow extends Marker{
  constructor(){
    super()
  }
  extendMethods(){
    return {
      setContent:this.setContent
    }
  }
  setContent(){
    this.renderComponent()
  }
}


let ProxyInfoWindow = new Proxy(InfoWindow,{
  construct(target,[html,options,events]){
    return new target().init(html,options,events)
  }
})

export {InfoWindow,ProxyInfoWindow}