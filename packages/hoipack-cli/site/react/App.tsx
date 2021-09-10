import React, { useState, useEffect,useRef,useReducer } from 'react';
import {Tmap,TmapMarker,TmapPolygon,TmapCluster} from '@/index';

interface interfaceT{
  [propName: string]: any;
}

const TianMap: React.FC<interfaceT> = () => {
  let mapRef = useRef(null);
  let [monitorMarker,setMonitorMarker] = useState([])
  let [mapCenter] = useState([107,32])
  let [zoom] = useState([])

  useEffect(()=>{
    setTimeout(()=>{
      let markers = []
      for (var i = 0; i < 1; i++) {
        let lng = 104.06 - (Math.random() * 1).toFixed(6);
        let lat = 30.67	 - (Math.random() * 1).toFixed(4);
        var point = [lng, lat];
       
        markers.push({
          position:point,
          data:{
            name:lng
          },
        })
      }
      setMonitorMarker(markers)
    },2000)
  },[])

  let color1 = {
    color:'red'
  }
  let color2 = {
    color:'yellow'
  }

  return (
    <div className="tian-map">
      <Tmap ref={mapRef} center={mapCenter} zoom={zoom}>
        {
          monitorMarker.map((marker: any) => {
            return (
              <TmapMarker marker={marker}>
                <div style={color1}>asdfas</div>
              </TmapMarker>
            )
          })
        }
        {/* <TmapCluster markers={monitorMarker}>
          <div slot="marker" style={color1}>asdfas</div>
          <div style={color2}>
            点1212
          </div>
        </TmapCluster> */}
        {/* {
          <TmapPolygon points={ARPolygon}></TmapPolygon>
        } */}
      </Tmap>
    </div>
  );
};

export default TianMap;
