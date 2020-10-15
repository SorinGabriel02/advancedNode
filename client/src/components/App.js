import React, { useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import BlogNew from "./blogs/BlogNew";
import BlogShow from "./blogs/BlogShow";

function App({ fetchUser, auth }) {
  const history = useHistory();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (auth) history.push("/blogs");
  }, [auth, history]);

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/blogs/new">
          {auth ? <BlogNew /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/blogs/:_id">
          {auth ? <BlogShow /> : <Redirect to="/" />}
        </Route>
        <Route path="/blogs">
          {auth ? <Dashboard /> : <Redirect to="/" />}
        </Route>
        <Route path="/" component={Landing} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
