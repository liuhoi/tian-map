<script>
import {ProxyInfoWindow} from '../utils/overlay/mapOverlay'

export default {
  name: "tmapInfoWindow",
  inject: {
    $tmapPromiseLazy: { default: '' }
  },
  props: {
    position: {
      type:Array
    },
    visible: {
      type:Boolean
    },
    data: {
      type:Object
    }
  },
  watch:{
    visible(val){
      if(val){
        this.$tmapComponent.show(this.position)  
      }else{
        this.$tmapComponent.hide()
      }
     
    },
    data:{
      deep:true,
      handler(val){
        console.log(val)
        if(!this.visible){
          return
        }
        this.$tmapComponent.hide()
        this.$tmapComponent.show(this.position,val)
        
        
      }
    }
  },
  data(){
    return {
      $tmap:null,
      $tmapComponent:null,
      $mapApi : null
    }
  },
  created(){
    
  },
  render(){
    return null
  },
  mounted(){
    this.$tmapPromiseLazy.then(({map,mapApi}) => {
      this.$tmap = map;
      this.$mapApi = mapApi;
      this.initComponent();
      
    })
  },
  
  destroyed() {
    this.removeOverlay();
  },
  methods:{
    initComponent() {
      this.$tmapComponent = this.initMarker();
      this.$tmap.addOverLay(this.$tmapComponent);
      this.$tmapComponent.hide()
    },
    initMarker(){
      return new ProxyInfoWindow( this.$scopedSlots.default,{
        position:this.position,
        keyData:this.data,
        type:'infoWindow'
      })
    },
    removeOverlay(){
      this.$tmapComponent && this.$tmap.removeLayer(this.$tmapComponent)
      this.$tmapComponent = null;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
