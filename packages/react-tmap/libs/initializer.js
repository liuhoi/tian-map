import loadScript from '@/tools/loadScript'
export default (() => {
  let isApiSetUp = false

  return (options) => {
    if (typeof document === 'undefined') {
      // Do nothing if run from server-side
      return
    }

    if (!isApiSetUp) {
      isApiSetUp = true
      return new Promise(resolve => {
        loadScript('http://api.tianditu.gov.cn/api',options,'T',(api)=>{
          resolve(api)
        })
      })
    } else {
      throw new Error('You already started the loading of initializer maps')
    }
  }
})()