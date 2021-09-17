import './TmapMarker.scss';
import React, { useState, useEffect,useContext ,useRef} from 'react';
import {ProxyMarker} from '../utils/overlay/mapOverlay'
import {MapContext} from '../utils/context'

interface marker{
  marker:any,
  events?:any,
  render():any,
  [propName: string]: any;
}

const TmapMarker: React.FC<marker> = ({marker,render,events,children},ref) => {
  let {$tmap} = useContext(MapContext)
  const createMarker = (data:any) => {
    let marker = new (ProxyMarker as any)(render,{
      position:data.position,
      keyData:data.data,
    },events);
    ($tmap as any).addOverLay(marker);
    return marker
  }

  useEffect(()=>{
    let $tmapComponent:any = null;
    if($tmap){
      $tmapComponent = createMarker({
        position:marker.position,
        data:marker.data
      });
      
    }
    return ()=>{
      if( $tmapComponent && $tmap){
        $tmapComponent && ($tmap as any).removeLayer($tmapComponent)
        $tmapComponent = null;
      }
    }
  },[$tmap])

  return null
};

export default TmapMarker;
