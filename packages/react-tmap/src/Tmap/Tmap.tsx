import './Tmap.scss';
import React,{useState,useEffect,useRef,useImperativeHandle} from 'react';

import {MapContext} from '../utils/context'

import CONSTANTS from '../utils/config/constant'
import loadTmapApi from '../utils/initializer'
import promiseLazyFactory from '../utils/promise-lazy'

import config from '../utils/config/map';

const promiseLazyCreator  = promiseLazyFactory(loadTmapApi)
const tmapApiPromiseLazy = promiseLazyCreator({
  tk: CONSTANTS.TMAP_KEY,
});

interface MapPros{
  [propName: string]: any;
}

interface MapRef{
  [propName: string]: any;
}

const TampRef= React.forwardRef<MapRef, MapPros>(({children , center = [config.deFaultLng,config.deFaultLat],zoom = config.zoom},ref) => {
  
  let [$tmap,set$tmap] = useState<any>(null)
  let [$mapApi,set$mapApi] = useState<any>(null)

  const tmap = useRef(null);

  const initMap = (mapApi:any) => {
    let {
      tileUrl,
      fontLayerUrl,
      minZoom,
      maxZoom,
      zoom,
      deFaultLng,
      deFaultLat
    } = config;

    let tile = new mapApi.TileLayer(tileUrl)
    let fontLayer = new mapApi.TileLayer(fontLayerUrl)
    let layConfig = {
      layers: [tile, fontLayer],
      minZoom,
      maxZoom,
      zoom,
      center: new mapApi.LngLat(deFaultLng, deFaultLat)
    }

    //初始化地图对象
    set$tmap(new mapApi.Map(tmap.current, layConfig))

  }

  const markerCenterAndZoom = (position:any,offset = 300) => {
    let [lng,lat] = position;
    let getZoom = $tmap.getZoom();
    var pointer = $tmap.lngLatToLayerPoint({lat,lng});
    pointer.y -= offset;
    let center = $tmap.layerPointToLngLat(pointer);
    $tmap.panTo(center,getZoom);
  }

  const getMap = () => {
    return $tmap;
  }

  useEffect(()=>{
    tmapApiPromiseLazy().then((mapApi:any) => {
      set$mapApi(mapApi)
      initMap(mapApi)
    })
  },[1])

  useEffect(()=>{
    if($tmap && $mapApi){
      let [lng, lat] = center;
      $tmap.panTo(new $mapApi.LngLat(lng, lat),zoom);
    }

  },[center,zoom])

  useImperativeHandle(ref,()=>{
    return {
      markerCenterAndZoom,
      getMap
    }
  })

  return (
    <div className="tmap">
      <MapContext.Provider value={{$tmap,$mapApi}}>
        {children}
      </MapContext.Provider>
     
      <div className="map-container" ref={tmap}></div>
    </div>
  );
})

export default TampRef;