import React from 'react';
import ReactDOM from'react-dom' ;
import {Router,Route,Switch} from 'react-router-dom';
import history from './history';

import {getRoutes} from './routes';

let routes = getRoutes();

function renderRoutes(routes){
  return routes.map(({path,exact,component:RouterComponent,routes:childrenRoutes = []})=>{
     return (
        <Route 
          key={path}
          path = {path}
          exact = {exact}
          render= {
            routerProps => (
              <RouterComponent {...routerProps}>
                <Switch>
                  {renderRoutes(childrenRoutes)}
                </Switch>
              </RouterComponent>
            )
          }
        />
     )
  })
}

ReactDOM.render(
  <Router history = {history}>
    {renderRoutes(routes)}
  </Router>
  ,document.getElementById('app')
)