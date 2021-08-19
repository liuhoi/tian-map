export class MarkerClusterer {
  constructor(map, options) {
    this._map = map;
    this._markers = [];
    this._clusters = [];
    this._map.addEventListener('zoomend', (e) => {
      this._redraw();
    })
    let mkrs = options.markers || [];
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
    var distance = 4000000;
    var clusterToAddTo = null;
    for(var i = 0, cluster; cluster = this._clusters[i]; i++){
      var center = cluster.getCenter();
      if(center){
          var d = this._map.getDistance(center, marker.getPosition());
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
    for(var i = 0, marker; marker = this._markers[i]; i++){
      marker.isInCluster = false;
    }
  }
}

export class Cluster {
  constructor(markerClusterer) {
    this._map = markerClusterer.getMap();
    this._center = null;
    this._markers = []
    this._minClusterSize = 2
    this._clusterMarker = new T.Marker(new T.LngLat(116.411794, 39.9068))
    //this._map.addOverLay(this._clusterMarker);
  }
  addMarker(marker) {
    if(!this._center){
      this._center = marker.getPosition();
    }
    marker.isInCluster = true;
    this._markers.push(marker);

    let len = this._markers.length;
    if(len < this._minClusterSize ){    
      this._map.addOverLay(marker);
      
      // return true;
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
  isMarkerInClusterBounds(){

  }
  updateClusterMarker(){
    if (this._markers.length < this._minClusterSize) {
      this._clusterMarker.hide();
      return;
    }
  }
  remove(){
    for (let i = 0, m; m = this._markers[i]; i++) {
      this._map.removeOverLay(this._markers[i]);
    }//清除散的标记点
    this._map.removeOverLay(this._clusterMarker);
    this._markers.length = 0;
    delete this._markers;
  }
}