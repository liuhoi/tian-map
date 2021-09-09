import CONSTANTS from './constant'

export default {
  tileUrl:"http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk="+CONSTANTS.TMAP_KEY,
  fontLayerUrl:"http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk="+CONSTANTS.TMAP_KEY,
  minZoom:1,
  maxZoom:18,
  zoom:8,
  deFaultLng:104.070000,
  deFaultLat:30.670000
}