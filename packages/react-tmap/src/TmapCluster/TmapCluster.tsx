import './TmapCluster.scss';
import React, { useState, useEffect,useContext ,useRef} from 'react';
import {createPortal} from 'react-dom';
import {MapContext} from '../utils/context'

import { MarkerClusterer } from "../utils/MarkerClusterer";
import { ProxyCluster } from "../utils/overlay/mapOverlay";

interface marker{
  markers:any,
  [propName: string]: any;
}
const TmapCluster: React.FC<marker> = ({markers = [],children}) => {
  let {$mapApi,$tmap} = useContext(MapContext)

  let markerEl = document.createElement('div')
  markerEl.classList.add('tmap-marker')

  let clusterEl = document.createElement('div')
  clusterEl.classList.add('tmap-cluster')
  
  useEffect(()=>{
    if($tmap){
      let markerPane = ($tmap as any).getPanes().markerPane;
      markerPane.appendChild(markerEl)
      markerPane.appendChild(clusterEl)
      addMarkers(markers);
    }
    return ()=>{
      if($tmap){
        let markerPane = ($tmap as any).getPanes().markerPane;
        markerPane.removeChild(markerEl)
        markerPane.removeChild(clusterEl)
      }
    }
  },[$tmap,markers])
  


  const  initMarker = (vm:any) => {
    console.log(markerEl,'markerEl')
    return new (ProxyCluster as any)(
      markerEl,
      {
        position:vm.position,
        keyData:vm.data
      }
    );
  }

  const initClusterMarker = () =>  {
    console.log(clusterEl,'clusterEl')
    return new (ProxyCluster as any)(
      clusterEl,
    {
      position:[104.06, 30.67],
      data:{}
    });
  }

  const addMarkers = (arr:any) => {
    let markers = arr.map((data:any) => {
      return initMarker(data);
    });
    new MarkerClusterer($tmap, {
      markers,
      clusterMarker: initClusterMarker,
    });
  }

  const renderChild = (childrens:any):any => {

    let marker:any = null;
    let cluster:any = null;

    childrens.forEach((child:any) => {
      if(child?.props?.slot === 'marker'){
        marker = marker;
      }else{
        cluster = child
      }
    })
    let ss = createPortal(
      marker,
      markerEl
    )
    let sd = createPortal(
      cluster,
      clusterEl
    )
    console.log(sd,ss,'ss')

    return [
      ss,
      sd
    ]
    
  }

  return (
   <>
    {renderChild(children)}  
   </>
  )   
};

export default TmapCluster;
