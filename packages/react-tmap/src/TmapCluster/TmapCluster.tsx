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
const TmapCluster: React.FC<marker> = ({markers = [],onClick,children}) => {

  let {$mapApi,$tmap} = useContext(MapContext)
  useEffect(()=>{
    if($tmap){
      addMarkers(markers);
    }
  },[$tmap,markers])
  


  const  createMarker = (vm:any) => {
    let {markerSlot} = renderChild(children)
    let marker = new (ProxyCluster as any)(
      markerSlot,
      {
        position:vm.position,
        keyData:vm.data
      }
    );
    marker.addEvent('click',onClick)
    return marker
  }

  const createClusterMarker = () =>  {
    let {clusterSlot} = renderChild(children)
    let marker =  new (ProxyCluster as any)(
      clusterSlot,
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

  const renderChild = (childrens:any):any => {

    let markerSlot:any = null;
    let clusterSlot:any = null;

    childrens.forEach((child:any) => {
      if(child?.props?.slot === 'marker'){
        markerSlot = child;
      }else{
        clusterSlot = child
      }
    })
    return {
      markerSlot,
      clusterSlot
    }
  }

  return null
};

export default TmapCluster;
