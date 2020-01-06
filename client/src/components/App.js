import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

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
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={Main} />
      <Route path="/ad/search" component={AdSearch} />
      <Route path="/ad/show" component={AdDisplay} />
      <Route path="/ad/create" component={AdCreate} />
      <Route path="/ad/edit" component={AdEdit} />
      <Route path="/user/signup" component={UserSignUp} />
      <Route path="/user/login" component={UserLogIn} />
      <Route path="/user/profile" exact component={UserProfile} />
      <Route path="/user/edit" exact component={UserEdit} />
      <Route path="/user/pass" exact component={UserChangePassword} />
      <Route path="/user/delete" exact component={UserDelete} />
      <Route path="/conversation" component={Conversation} />

      <Footer />
    </BrowserRouter>
  );
};

export default App;
