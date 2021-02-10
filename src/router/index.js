import React from 'react';
import dynamic from 'dva/dynamic';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import App from '../module/app/components/App';
import routes from './router';
const { ConnectedRouter } = routerRedux;

export default function RouterConfig({ history, app }) {
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          {routes.map(({ path, ...dynamics }, key) => (
            <Route
              key={key}
              exact
              path={path}
              component={dynamic({
                app,
                ...dynamics
              })}
            />
          ))}
        </Switch>
      </App>
    </ConnectedRouter>
  );
}
