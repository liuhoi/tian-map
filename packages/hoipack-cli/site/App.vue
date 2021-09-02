<template>
  <div>
   <tmap ref="map">
      <tmap-marker v-for="(marker,index) in markers" :key="index" :marker="marker">
        <template #default="marker">
          <div style="color:red;" @click="clickMarker(marker)">点{{marker.name}}</div>
        </template>
      </tmap-marker>
      <!-- <tmap-cluster :markers="markers">
        <template #marker="marker">
          <div style="color:red;" @click="clickMarker(marker)">asdfas</div>
        </template>
        <template #default="{markerNum}">
          <div style="color:yellow;">
            点{{markerNum}}
          </div>
        </template>
      </tmap-cluster> -->
      <tmap-info-window :position="infoWindow.position" :data="infoWindow.data" :visible="infoWindow.visible">
        <div style="color:yellow;">{{infoWindow.data}}</div>
      </tmap-info-window>
      
      <tmap-cardinal-arrow :points="markers.map(v =>v.position)" />
      <tmap-polygon :points="markers.map(v =>v.position)" />
      <tmap-polyline :points="markers.map(v =>v.position)" />


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
      for (var i = 0; i < 20; i++) {
        let lng = 104.06 - (Math.random() * 10).toFixed(6);
        let lat = 30.67	 - (Math.random() * 10).toFixed(4);
        var point = [lng, lat];
        this.markers.push({
          position:point,
          keyData:{
            name:1123213
          },
        })
      }
    },
    methods: {
      clickMarker(marker){
        console.log(marker)
        this.infoWindow.position = marker.position
        this.infoWindow.data = marker.keyData
        this.infoWindow.visible = !this.infoWindow.visible;
      }
    }
  }
</script>

<style scoped>
  

</style>
