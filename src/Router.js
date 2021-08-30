import React from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
// import { Redirect } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Movie from "./pages/Mymovie";
import Video from "./pages/Video";

class AppRouter extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/:id" children={<Child />} />
          <Route path="/" children={<Child />} />
          <Redirect to="/" />
        </Switch>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/my-movie">
            <Movie />
          </Route>
          <Route path="/video">
            <Video />
          </Route>
        </Switch>
      </>
    );
  }
}

export default AppRouter;

function Child(props) {
  let { id } = useParams();

  return <Header id={id} />;
}
