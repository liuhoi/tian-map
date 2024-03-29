import {Marker} from './markerAdaper'
class Cluster extends Marker{
  constructor(){
    super()
  }
  extendMethods(){
    return {
      setText:this.setText
    }
  }
  setText(text){
    this.renderComponent({
      markerNum:text
    })
  }
}


let ProxyCluster = new Proxy(Cluster,{
  construct(target,[content,options,events]){
    return new target().init(content,options,events)
  }
})

export {Cluster,ProxyCluster}