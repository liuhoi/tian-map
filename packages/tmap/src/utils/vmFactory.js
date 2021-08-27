import Vue from 'vue';

export const vmFactory = (scopedSlots) => {
  return new Vue({
    data() {
      return {
        markerNum:0
      };
    },
    render(h) {
      let nodes = scopedSlots({markerNum:this.markerNum});
      return (
        <div ref='node' class={["tmap-marker",(this.markerNum >= 2 &&  'tmap-cluster')] }>
          {nodes}
        </div>
      )
    }
  }).$mount()
}