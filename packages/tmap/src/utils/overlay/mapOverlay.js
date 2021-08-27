export default function(mapApi){
  return mapApi.Overlay.extend({
    initialize: function (html,options = {}) {
      this.html = html;
      this.lnglat = new mapApi.LngLat(...options.lngLat);
    },
    onAdd: function (map) {
      this.map = map;
      this.html.style.position = 'absolute'
      map.getPanes().markerPane.appendChild(this.html);
      this.update();
    },
  
    onRemove: function () {
      let parent = this.html.parentNode;
      if (parent) {
        parent.removeChild(this.html);
        // this.map = null;
        // this.html = null;
      }
    },

    /**
     * 更新位置
     */
    update: function () {
      
      var pos = this.map.lngLatToLayerPoint(this.lnglat);
      this.html.style.top =  pos.y  + "px";
      this.html.style.left = pos.x  + "px";
    },
    getPosition(){
      return this.lnglat
    },
    hide(){
      this.onRemove()
    },
    show(){
      let parent = document.getElementsByClassName('tdt-marker-pane');
      if (parent[0]) {
        parent[0].appendChild(this.html);
      }
    },
    setLngLat(lnglat){
      this.lnglat = lnglat
      this.update()
    },
    setText(text){
      this.html.querySelector('.html').innerHTML = text
    }
  });
}