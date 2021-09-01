import './TmapInfoWindow.scss';
import React, { useState, useEffect,useContext ,useRef} from 'react';
import infoWindowOverlayCreator from '../../overlay/infoWindowOverlay'

import {MapContext} from '../../context'
interface marker{
  [propName: string]: any;
}

const TmapInfoWindow: React.FC<marker> = ({position,visible,data,children}) => {
  let {$mapApi,$tmap} = useContext(MapContext)
  let ref = useRef(null);
  useEffect(()=>{
    let $tmapComponent:any = null;
    if($tmap){
      let overlayCreator = infoWindowOverlayCreator($mapApi)
      $tmapComponent = new overlayCreator( ref.current,{
        lngLat:position,
        data:data
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
      <div className="tmap-info-window" ref={ref}>
        {children}
      </div>
    </div>
    
  );
};

export default TmapInfoWindow;
