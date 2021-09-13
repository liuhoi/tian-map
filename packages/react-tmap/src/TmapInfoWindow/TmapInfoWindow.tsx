import './TmapInfoWindow.scss';
import React, { useState, useEffect,useContext ,useRef} from 'react';
import {ProxyInfoWindow} from '../utils/overlay/mapOverlay'

import {MapContext} from '../utils/context'
interface marker{
  [propName: string]: any;
}

const TmapInfoWindow: React.FC<marker> = ({position,visible,infoData,children}) => {
  let {$mapApi,$tmap} = useContext(MapContext)
  let [infoWindow,setInfoWindow] = useState<any>(null)
  useEffect(()=>{
    
    if($tmap){
      let infoWindow = new (ProxyInfoWindow as any)(children,{
        position:position,
        data:infoData,
        panesType:2
      });
      setInfoWindow(infoWindow);
      ($tmap as any).addOverLay(infoWindow);
      visible ? (infoWindow.show(),infoWindow.setLngLat(position)) :infoWindow.hide()
    }
    return ()=>{
      if( infoWindow && $tmap){
        infoWindow && ($tmap as any).removeLayer(infoWindow)
        infoWindow = null;
      }
    }
  },[$tmap])

  useEffect(()=>{
    if($tmap && infoWindow){
      infoWindow.setContent(children)
      visible && infoWindow.setLngLat(position)
      visible ? infoWindow.show() :infoWindow.hide()
    }
  },[children])
  return (
    null
  );
};

export default TmapInfoWindow;
