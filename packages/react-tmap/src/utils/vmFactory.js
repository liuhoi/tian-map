import React,{createElement} from 'react';
import {createPortal,render} from 'react-dom';

export const vmFactory = (vm,options = {}) => {
  let wrapper = vm.getElement();
  if(options.markerNum >= 2){
    wrapper.classList.add('tmap-cluster')
  }
  return render(
    (<>
      {vm.content({marker:vm,extData:options})}
    </>)
    ,wrapper)
}