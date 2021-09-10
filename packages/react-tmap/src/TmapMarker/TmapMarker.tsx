import './TmapMarker.scss';
import React, { useState, useEffect,useContext ,useRef} from 'react';
import {ProxyMarker} from '../utils/overlay/mapOverlay'

import {MapContext} from '../utils/context'
interface marker{
  marker:any,
  onClick?:any,
  [propName: string]: any;
}

const TmapMarker: React.FC<marker> = ({marker,children,onClick}) => {
  let {$tmap} = useContext(MapContext)
  let ref = useRef(null);

  const initMarker = (html:any,marker:any) => {
    return new (ProxyMarker as any)( html,{
      position:marker.position,
      keyData:marker.data
    })
  }

  useEffect(()=>{
    let $tmapComponent:any = null;
    if($tmap){
      $tmapComponent = initMarker( ref.current,{
        position:marker.position,
        data:marker.data
      });
      ($tmap as any).addOverLay($tmapComponent);
    }
    return ()=>{
      if( $tmapComponent && $tmap){
        $tmapComponent && ($tmap as any).removeLayer($tmapComponent)
        $tmapComponent = null;
      }
    }
  },[$tmap])

  return (
    <div className="hide-el">
      <div className="tmap-marker" ref={ref} onClick={onClick}>
        {children}
      </div>
    </div>
    
  );
};

export default TmapMarker;
