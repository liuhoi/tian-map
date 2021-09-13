import './TmapPolyline.scss';
import React, { useState, useEffect,useContext ,useRef} from 'react';

import {MapContext} from '../utils/context'
interface marker{
  points:any,
  [propName: string]: any;
}

const TmapPolyline: React.FC<marker> = ({points,children}) => {
  let {$mapApi,$tmap} = useContext(MapContext)
  let domRef = useRef(null);
  useEffect(()=>{
    let $tmapComponent:any = null;
    if($tmap){
      let lnglats = points.map((point:any[]) => {
        return point instanceof T.dq ? point: new T.LngLat(point[0],point[1])
      })
      $tmapComponent = new ($mapApi as any).Polyline( lnglats,{
        color: 'red',
        weight: 3,
        opacity:  1,
        fillColor:  '#FFFFFF',
        fillOpacity: 0
      });
      ($tmap as any).addOverLay($tmapComponent);
    }
    return ()=>{
      if( $tmapComponent && $tmap){
        $tmapComponent && ($tmap as any).removeLayer($tmapComponent)
        $tmapComponent = null;
      }
    }
  },[$tmap,points])

  return (null);
};

export default TmapPolyline;
