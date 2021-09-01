import {LngLatBounds,LngLat} from './apiAdaper'

let getExtendedBounds = function(map, bounds, gridSize){
  bounds = cutBoundsInRange(bounds);
  let pixelNE = map.lngLatToLayerPoint(bounds.getNorthEast());
  let pixelSW = map.lngLatToLayerPoint(bounds.getSouthWest()); 
  pixelNE.x += gridSize;
  pixelNE.y -= gridSize;
  pixelSW.x -= gridSize;
  pixelSW.y += gridSize;
  let newNE = map.layerPointToLngLat(pixelNE);
  let newSW = map.layerPointToLngLat(pixelSW);
  return new LngLatBounds(newSW, newNE);
};

let cutBoundsInRange = function (bounds) {
  let maxX = getRange(bounds.getNorthEast().lng, -180, 180);
  let minX = getRange(bounds.getSouthWest().lng, -180, 180);
  let maxY = getRange(bounds.getNorthEast().lat, -74, 74);
  let minY = getRange(bounds.getSouthWest().lat, -74, 74);
  return new LngLatBounds(new LngLat(minX, minY), new LngLat(maxX, maxY));
}; 

let getRange = function (i, mix, max) {
  mix && (i = Math.max(i, mix));
  max && (i = Math.min(i, max));
  return i;
};


export class MarkerClusterer {
  constructor(map, options) {
    this._map = map;
    this._markers = [];
    this._clusters = [];
    this._gridSize = 60;
    this._map.addEventListener('zoomend', (e) => {
      this._redraw();
    })
    this._map.addEventListener('moveend',() => {
      this._redraw();     
    });
    let mkrs = options.markers || [];
    this.clusterMarker = options.clusterMarker
    this.addMarkers(mkrs)
  }
  
  addMarkers(markers) {
    markers.forEach((marker, index) => {
      this._pushMarkerTo(marker)
    })
    this._createClusters();
  }

  getMap(){
    return this._map;
  }

  getGridSize(){
    return this._gridSize;
  }

  _pushMarkerTo(marker) {
    let index = this._markers.indexOf(marker)
    if (index === -1) {
      marker.isInCluster = false;
      this._markers.push(marker)
    }
  }

  _createClusters() {
    this._markers.forEach(marker => {
      this._addToClosestCluster(marker)
    })
  }

  _addToClosestCluster(marker){
    let distance = 4000000;
    let clusterToAddTo = null;
    for(let i = 0, cluster; cluster = this._clusters[i]; i++){
      let center = cluster.getCenter();
      if(center){
          let d = this._map.getDistance(center, marker.getPosition());
          if(d < distance){
              distance = d;
              clusterToAddTo = cluster;
          }
      }
    }

    if(clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)){
      clusterToAddTo.addMarker(marker);
    }else{
      let cluster = new Cluster(this);
      cluster.addMarker(marker);            
      this._clusters.push(cluster);
    }

  }

  _redraw() {
    this._clearLastClusters();
    this._createClusters();
  }

  _clearLastClusters(){
    for(let i = 0, cluster; cluster = this._clusters[i]; i++){            
      cluster.remove();
    }
    this._clusters = [];//置空Cluster数组
    this._removeMarkersFromCluster();//把Marker的cluster标记设为false
  }
  _removeMarkersFromCluster(){
    for(let i = 0, marker; marker = this._markers[i]; i++){
      marker.isInCluster = false;
    }
  }
  
}

export class Cluster {
  constructor(markerClusterer) {
    this._markerClusterer = markerClusterer;
    this._map = markerClusterer.getMap();
    this._center = null;
    this._markers = []
    this._minClusterSize = 2
    this._gridBounds = null;//以中心点为准，向四边扩大gridSize个像素的范围，也即网格范围
    this._clusterMarker = markerClusterer.clusterMarker()
    let clusterMarker = this._clusterMarker.getElement();
    clusterMarker.addEventListener('click', (event) => {
      let thatBounds = this.getBounds();
      this._map.setViewport([thatBounds.getSouthWest(),thatBounds.getNorthEast()]);
    });
  }
  addMarker(marker) {
    if(!this._center){
      this._center = marker.getPosition();
      this.updateGridBounds();
    }
    marker.isInCluster = true;
    this._markers.push(marker);

    let len = this._markers.length;
    if(len < this._minClusterSize ){    
      this._map.addOverLay(marker);
      
      return true;
    } else if (len === this._minClusterSize) {
      for (let i = 0; i < len; i++) {
        this._map.removeOverLay(this._markers[i]);
      }

    } 
    this._map.addOverLay(this._clusterMarker);
    this.updateClusterMarker();
    return true
  }
  getCenter(){
    return this._center;
  }
  isMarkerInClusterBounds(marker){
    return this._gridBounds.contains(marker.getPosition());
  }
  updateClusterMarker(){
    if (this._markers.length < this._minClusterSize) {
      this._clusterMarker.hide();
      return;
    }
    this._clusterMarker.show();
    this._clusterMarker.setText(this._markers.length)
    this._clusterMarker.setLngLat(this._center)
   
  }
  remove(){
    for (let i = 0, m; m = this._markers[i]; i++) {
      this._map.removeOverLay(this._markers[i]);
    }//清除散的标记点
    this._map.removeOverLay(this._clusterMarker);
    this._markers.length = 0;
    delete this._markers;
  }
  updateGridBounds(){
    let bounds = new LngLatBounds(this._center, this._center);
    this._gridBounds = getExtendedBounds(this._map, bounds, this._markerClusterer.getGridSize());

  }
  getBounds(){
    let bounds = new LngLatBounds(this._center,this._center);
    
    for (let i = 0, marker; marker = this._markers[i]; i++) {
        bounds.extend(marker.getPosition());
    }
    return bounds;
  }
}