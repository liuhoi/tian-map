<template>
  <div>
   <tmap ref="map">
      <!-- <tmap-marker v-for="(marker,index) in markers" :key="index" :marker="marker">
        <template #default="{markerNum}">
          <div style="color:red;">点{{markerNum}}</div>
        </template>
      </tmap-marker> -->
      <tmap-cluster :markers="markers">
        <template #marker="marker">
          <div style="color:red;" @click="clickMarker(marker)">asdfas</div>
        </template>
        <template #default="{markerNum}">
          <div style="color:yellow;" class="html">
            点{{markerNum}}
          </div>
        </template>
      </tmap-cluster>
      <tmap-info-window :position="infoWindow.position" :data="infoWindow.data" :visible="infoWindow.visible">
        <div>asdfasasafsdasdfas</div>
      </tmap-info-window>

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
          data:{}
        })
      }
    },
    methods: {
      clickMarker(marker){
        this.infoWindow.visible = true
        console.log(marker)
      }
    }
  }
</script>

<style scoped>
  

</style>
