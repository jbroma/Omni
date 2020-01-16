import React from "react";

import { Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import history from "../history";

import { AdCreate, AdEdit, AdDisplay, AdSearch } from "./Ads/Ads";
import {
  UserSignUp,
  UserLogIn,
  UserProfile,
  UserChangePassword,
  UserDelete,
  UserEdit
} from "./User/User";
import Conversation from "./Conversation/Conversation";

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/ad/search" exact component={AdSearch} />
        <Route path="/ad/show/:id" component={AdDisplay} />
        <ProtectedRoute path="/ad/create" exact component={AdCreate} />
        <ProtectedRoute path="/ad/edit/:id" component={AdEdit} />
        <Route path="/user/signup" exact component={UserSignUp} />
        <Route path="/user/login" exact component={UserLogIn} />
        <ProtectedRoute path="/user/profile" exact component={UserProfile} />
        <ProtectedRoute path="/user/edit" exact component={UserEdit} />
        <ProtectedRoute
          path="/user/pass"
          exact
          component={UserChangePassword}
        />
        <ProtectedRoute path="/user/delete" exact component={UserDelete} />
        <ProtectedRoute path="/conversation/:id" component={Conversation} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
