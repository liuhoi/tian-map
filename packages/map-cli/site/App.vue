<template>
  <div>
   <tmap>
     <tmap-marker v-for="marker in markers" :marker="marker">
       <div>asdfasd</div>
     </tmap-marker>
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
      for (var i = 0; i < 10; i++) {
        let lng = 104.06 - (Math.random() * 0.1).toFixed(6);
        let lat = 30.67	 - (Math.random() * 0.1).toFixed(4);
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
