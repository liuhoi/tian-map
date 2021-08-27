<script>
export default {
  name: "tmapPolygon",
  inject: {
    $tmapPromiseLazy: { default: '' }
  },
  props: {
    polygon: {
      type:Array,
      default:()=>[]
    },
    config:{
      type:Object,
      default:()=>{}
    }
  },
  computed:{
    mergeConfig(){
      return {...this.defaultConfig,...this.config}
    }
  },
  watch:{
    polygon:{
      deep:true,
      handler(val){
        if(val.length){
          if(this.$tmap && this.$mapApi){
            this.addPolygon();
          }else{
            this.$tmapPromiseLazy.then(({map,mapApi}) => {
              this.$tmap = map;
              this.$mapApi = mapApi;
              this.addPolygon();
            })
          }
          
          
        }
        
      }
    }
  },
  data(){
    return {
      $tmap:null,
      $tmapComponent:null,
      $mapApi : null,
      defaultConfig:{
        color: 'red',
        weight: 3,
        opacity:  1,
        fillColor:  '#FFFFFF',
        fillOpacity: 0
      }
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
    })
  },
  
  destroyed() {
    this.removeaddPolygon();
  },
  methods:{
    initComponent() {
      this.removeaddPolygon();
      let {$tmap,$mapApi,polygon} = this;
      this.$tmapComponent = new $mapApi.Polygon(polygon,this.mergeConfig);
      $tmap.addOverLay(this.$tmapComponent);
    },
    addPolygon(){
      this.initComponent();
    },
    removeaddPolygon(){
      this.$tmapComponent && this.$tmap.removeLayer(this.$tmapComponent)
      this.$tmapComponent = null;
    },
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
