import lazy from './lazy-value'
const DEFAULT_AMP_CONFIG = {
  tk: null,
  v: '4.0',
};

export default function (loadGmapApi) {
  return function promiseLazyCreator (options = {}) {
    return lazy(() => { // Load the
      return new Promise((resolve, reject) => {
        const mergeOptions = {...DEFAULT_AMP_CONFIG,...options}
        try {
          loadGmapApi(mergeOptions).then(res => {
            resolve(res);
          });
        } catch (err) {
          reject(err)
        }
      })
    })
  }
}
