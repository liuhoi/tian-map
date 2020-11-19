<template>
  <div>
   <tmap></tmap>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        init: false,
        isIndex: true
      }
    },
    mounted () {
      //  这里模拟数据请求
      setTimeout(() => {
        this.init = true
      }, 250)
      new Promise(()=>{

      })
      console.log(23423)
    },
    components: {
    }
  }
</script>

<style scoped>
  

</style>
