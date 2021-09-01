import './TmapMarker.scss';
import React, { useState, useEffect,useContext ,useRef} from 'react';
import markerOverlayCreator from '../../overlay/mapOverlay'

import {MapContext} from '../../context'
interface marker{
  marker:any,
  onClick?:any,
  [propName: string]: any;
}

const TmapMarker: React.FC<marker> = ({marker,children,onClick}) => {
  let {$mapApi,$tmap} = useContext(MapContext)
  let ref = useRef(null);
  useEffect(()=>{
    let $tmapComponent:any = null;
    if($tmap){
      let overlayCreator = markerOverlayCreator($mapApi)
      $tmapComponent = new overlayCreator( ref.current,{
        lngLat:marker.position,
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
