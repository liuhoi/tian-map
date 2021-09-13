<template>
  <div>
   <tmap ref="map">
      <!-- <tmap-marker v-for="(marker,index) in markers" :key="index" :marker="marker">
        <template #default="marker">
          <div style="color:red;" @click="clickMarker(marker)">点{{marker.keyData.name}}</div>
        </template>
      </tmap-marker> -->
      <tmap-cluster :markers="markers">
        <template #marker="marker">
          <div style="color:red;" @click="clickMarker(marker)">asdfas</div>
        </template>
        <template #default="{markerNum}">
          <div style="color:yellow;">
            点{{markerNum}}
          </div>
        </template>
      </tmap-cluster>
      <tmap-info-window :position="infoWindow.position" :keyData="infoWindow.data" :visible="infoWindow.visible">
        <template #default="marker">
          <div>
            <p @click="closeMarker(infoWindow)">
              sadfasdfa
            </p>
            
            <div style="color:yellow;" >{{infoWindow}}</div>
            <div>{{marker}}</div>
          </div>
            
        </template>
      </tmap-info-window>
      
      <!-- <tmap-cardinal-arrow :points="markers.map(v =>v.position)" />
      <tmap-polygon :points="markers.map(v =>v.position)" />
      <tmap-polyline :points="markers.map(v =>v.position)" /> -->


   </tmap>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data () {
      return {
        markers:[],
        infoWindow:{
          position:[],
          data:{},
          visible:false
        }
      }
    },
    mounted () {
      setTimeout(()=>{
        for (var i = 0; i < 1000; i++) {
          let lng = 104.06 - (Math.random() * 1).toFixed(6);
          let lat = 30.67	 - (Math.random() * 1).toFixed(4);
          var point = [lng, lat];
          this.markers.push({
            position:point,
            data:{
              name:lng
            },
          })
        }
      
      },2000)
    },
    methods: {
      clickMarker(marker){
        this.infoWindow.position = marker.position
        this.infoWindow.data = marker.keyData
        this.infoWindow.visible = true
        
      },
      closeMarker(){
        this.infoWindow.visible = false
      }
    }
  }
</script>

<style scoped>
  

</style>
