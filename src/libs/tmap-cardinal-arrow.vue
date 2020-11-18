<script>
import Vue from 'vue';
import CONSTANTS from './config/constant'

export default {
  name: "tmapCardinalArrow",
  inject: {
    $tmapPromiseLazy: { default: '' }
  },
  props: {
    points: {
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
    points:{
      deep:true,
      handler(val){
        if(val.length){
          if(this.$tmap && this.$mapApi){
            this.addPoints();
          }else{
            this.$tmapPromiseLazy.then(({map,mapApi}) => {
              this.$tmap = map;
              this.$mapApi = mapApi;
              this.addPoints();
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
    this.removeaddPoints();
  },
  methods:{
    initComponent() {
      this.removeaddPoints();
      let {$tmap,$mapApi,points} = this;
      this.$tmapComponent = new $mapApi.CardinalCurveArrow(points,this.mergeConfig);
      console.log(this.$tmapComponent)
      $tmap.addOverLay(this.$tmapComponent);
    },
    addPoints(){
      this.initComponent();
    },
    removeaddPoints(){
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
