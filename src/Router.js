import React from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Movie from "./pages/Mymovie";

class AppRouter extends React.Component {
  render() {
    return (
      // routing
      <Switch>
        <Route exact path="/" component={Home} fullLayout />
        <Route path="/my-movie" component={Movie} fullLayout />
        {/* <Route component={error404} fullLayout /> */}
      </Switch>
    );
  }
}

export default AppRouter;
