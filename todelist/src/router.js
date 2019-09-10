import React from 'react';
import { Router, Route, Switch ,} from 'dva/router';
import Todolist from './routes/Todolist';

import 'antd/dist/antd.css'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Todolist} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
