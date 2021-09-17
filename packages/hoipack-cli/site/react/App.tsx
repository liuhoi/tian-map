import React, { useState, useEffect,useRef,useReducer } from 'react';
import {Tmap,TmapMarker,TmapPolygon,TmapCluster,TmapInfoWindow,TmapPolyline,TmapCardinalArrow} from '@/index';

interface interfaceT{
  [propName: string]: any;
}

const TianMap: React.FC<interfaceT> = () => {
  let mapRef = useRef(null);
  let [monitorMarker,setMonitorMarker] = useState([])
  let [mapCenter] = useState([107,32])
  let [zoom] = useState([])
  let [position,setPostion] = useState([107,32])
  let [data,setData] = useState({
    name:'name11'
  })
  let [visible,setVisible] = useState(false)

  useEffect(()=>{
    let markers = [];

    for (var i = 0; i < 10; i++) {
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

    // setTimeout(()=>{
    //   markers = []
    //   for (var i = 0; i < 2; i++) {
    //     let lng = 104.06 - (Math.random() * 1).toFixed(6);
    //     let lat = 30.67	 - (Math.random() * 1).toFixed(4);
    //     var point = [lng, lat];
       
    //     markers.push({
    //       position:point,
    //       data:{
    //         name:lng
    //       },
    //     })
    //   }
    //   setMonitorMarker(markers)
    // },5000)
  },[])

  let color1 = {
    color:'red'
  }
  let color2 = {
    color:'yellow'
  }

  const clickMarker = (marker)=>{
    setPostion(marker.lnglat)
    setData(marker.keyData)
    setVisible(true)
  }
  const closeOpen = ()=>{
    setData({
      name:'21321'
    })
    setVisible(false)
  }

  const markerRender = ({marker})=>{
    let {lnglat} = marker;
      return (
        <div  style={color1}>
          <div>{lnglat.lat}</div>
          <div>{lnglat.lng}</div>
        </div>
      )
          
  }

  const clusterRender = ({extData})=>{
    return (
      <div style={color2} >
        点{extData.markerNum}
      </div>
    )
  }

  const infoWindowRender = ({marker})=>{
    let {lnglat} = marker
    return (
      <div style={color2} onClick={()=>{closeOpen()}}>
        <div>{marker.keyData.name}</div>
        <div>{lnglat.lat}</div>
        <div>{lnglat.lng}</div>
        <div>5454</div>
      </div>
    )
  }

  const events = {
    click:(marker)=>{
      clickMarker(marker)
    }
  }

  return (
    <div className="tian-map">
      <Tmap ref={mapRef} center={mapCenter} zoom={zoom}>
        {/* {
          monitorMarker.map((marker: any,index) => {
            return (
              <TmapMarker marker={marker} key={index} events={events} render={({marker})=>markerRender({marker})} />
            )
          })
        } */}
        <TmapCluster markers={monitorMarker} events={events} markerRender={({marker}) => markerRender({marker})} clusterRender={({extData}) => clusterRender({extData})} />
        
        <TmapInfoWindow position={position} infoData={data} visible={visible} render={({marker})=> infoWindowRender({marker}) } />

        {
          <TmapPolygon points={monitorMarker.map(v =>v.position)}></TmapPolygon>
        }
        {
          <TmapPolyline points={monitorMarker.map(v =>v.position)}/>
        }
        {
          <TmapCardinalArrow points={monitorMarker.map(v =>v.position)}/>
        }
      </Tmap>
    </div>
  );
};

export default TianMap;
