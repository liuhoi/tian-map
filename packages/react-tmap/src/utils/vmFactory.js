import React,{createElement} from 'react';
import {createPortal,render} from 'react-dom';

export const vmFactory = (scopedSlots,options) => {
  let divEl = document.createElement('div')
  document.body.append(divEl)
  divEl.className = 'middle'
  return createPortal(
    <div className="tmap-marker">
      {scopedSlots}
    </div>
    ,divEl)
}