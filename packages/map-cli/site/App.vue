<template>
  <div>
   <tmap ref="map">
      <!-- <tmap-marker v-for="(marker,index) in markers" :key="index" :marker="marker">
        <template #default="{markerNum}">
          <div style="color:red;">点{{markerNum}}</div>
        </template>
      </tmap-marker> -->
      <tmap-cluster :markers="markers">
        <template #marker>
          <div style="color:red;">asdfas</div>
        </template>
        <template #default="{markerNum}">
          <div style="color:yellow;" class="html">
            点{{markerNum}}
          </div>
        </template>
      </tmap-cluster>
   </tmap>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data () {
      return {
        markers:[]
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
    components: {
    }
  }
</script>

<style scoped>
  

</style>
