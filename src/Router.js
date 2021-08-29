import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
// import { Redirect } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Movie from "./pages/Mymovie";
import Video from "./pages/Video";

class AppRouter extends React.Component {
  render() {
    return (
      <Router basename="/">
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/my-movie" fullLayout>
            <Movie />
          </Route>
          <Route path="/video" fullLayout>
            <Video />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
