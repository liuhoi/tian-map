import './TmapCluster.scss';
import React, { useState, useEffect,useContext ,useRef} from 'react';
import {MapContext} from '../utils/context'

import { MarkerClusterer } from "../utils/MarkerClusterer";
import { ProxyCluster } from "../utils/overlay/mapOverlay";

import {vmFactory} from '../utils/vmFactory'

interface marker{
  markers:any,
  [propName: string]: any;
}
const TmapCluster: React.FC<marker> = ({markers = [],markerRender,clusterRender,events,children}) => {

  let {$mapApi,$tmap} = useContext(MapContext)
  useEffect(()=>{
    if($tmap){
      addMarkers(markers);
    }
  },[$tmap,markers])
  


  const  createMarker = (vm:any) => {
    let marker = new (ProxyCluster as any)(
      markerRender,
      {
        position:vm.position,
        keyData:vm.data
      },
      events
    );
    return marker
  }

  const createClusterMarker = () =>  {
    let marker =  new (ProxyCluster as any)(
      clusterRender,
    {
      position:[104.06, 30.67],
      data:{}
    });
    return marker
  }

  const addMarkers = (arr:any) => {
    let markers = arr.map((data:any) => {
      return createMarker(data);
    });
    new MarkerClusterer($tmap, {
      markers,
      clusterMarker: createClusterMarker,
    });
  }

  return null
};

export default TmapCluster;
