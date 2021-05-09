import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import News from './News';

const AppRouter = () => (
  <BrowserRouter>
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/news" exact component={News} />
      </Switch>
    </>
  </BrowserRouter>
);

export default AppRouter;
