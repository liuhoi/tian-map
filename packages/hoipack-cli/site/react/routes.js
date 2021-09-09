import App from './App'

export function getRoutes(){
  const routes = [
  {
    "path": "/",
    "exact": true,
    "component": App
  },
]
  return routes
}