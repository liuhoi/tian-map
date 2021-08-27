
/*
 * 加载js  
 *  @param  {url} baseUrl  请求地址
 *  @param  {options} querystring
 *  @param  {returnName} 全局变量名称
 *  @param  {fn} 回调  返回api
 *  @return []
 */

export default function loadScript (url,options = {},returnName,fn) {
    
    let scriptEl = document.createElement('SCRIPT')
    if (typeof options !== 'object') {
      throw new Error('options should  be an object')
    }

    // libraries
    let baseUrl = url;
    let query = ''
    if(Object.keys(options).length){
        query =  Object.keys(options)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(options[key]))
        .join('&');
        query = '?'+query
    }
  

    const URI = `${baseUrl}${query}`

    scriptEl.setAttribute('src', URI)
    scriptEl.setAttribute('async', '')
    scriptEl.setAttribute('defer', '')
    document.head.appendChild(scriptEl)
    scriptEl.onload = function(){
        fn&&fn(window[returnName])
    }
}