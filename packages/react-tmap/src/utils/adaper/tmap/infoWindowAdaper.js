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
  setContent(content){
    this.content = content
    this.renderComponent()
  }
}


let ProxyInfoWindow = new Proxy(InfoWindow,{
  construct(target,[html,options]){
    return new target().init(html,options)
  }
})

export {InfoWindow,ProxyInfoWindow}