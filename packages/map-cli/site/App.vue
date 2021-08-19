<template>
  <div>
   <tmap ref="map">
      <!-- <tmap-marker v-for="(marker,index) in markers" :key="index" :marker="marker">
        <div style="color:red;">点{{index}}</div>
      </tmap-marker> -->
      <tmap-cluster :markers="markers">
        <template v-slot:marker>
           <div style="color:red;">asdfas</div>
        </template>
      </tmap-cluster>
   </tmap>
  </div>
</template>

<script>

  import Tmap from '@/index'
  export default {
    name: 'app',
    data () {
      return {
        markers:[]
      }
    },
    mounted () {
      for (var i = 0; i < 10; i++) {
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
