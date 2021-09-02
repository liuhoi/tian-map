import Vue from 'vue';

export const vmFactory = (scopedSlots,options) => {
  return new Vue({
    data() {
      return {
        markerNum:0,
        keyData:options.keyData || {},
        position:options.position
      };
    },
    render(h) {
      let nodes = scopedSlots({markerNum:this.markerNum,keyData:this.keyData,position:this.position});
      return (
        <div ref='node' class={["tmap-marker",(this.markerNum >= 2 &&  'tmap-cluster'),options.type == 'infoWindow' && 'tmap-infowindow'] }>
          {nodes}
        </div>
      )
    }
  }).$mount()
}