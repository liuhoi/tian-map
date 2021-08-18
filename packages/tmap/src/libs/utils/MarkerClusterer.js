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

  _addToClosestCluster(){

  }

  _redraw() {
    console.log(1)
  }
}

export class Cluster {
  constructor() {

  }
  addMarker() {

  }
}