import { number } from 'echarts';
import {render,reactive,h, toRefs} from 'vue';

export const vmFactory = (vm,options) => {
  let wrapper = vm.getElement();
  if(options.markerNum >= 2){
    wrapper.classList.add('tmap-cluster')
  }
  render(
    h({
      setup(props) {
        return ()=>(
          <>
            {vm.content({markerNum:options.markerNum,keyData:vm.keyData,position:vm.lnglat})}
          </>
        )
      }
    })
  ,wrapper);
}