import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

import { AdCreate, AdEdit, AdDisplay, AdSearch } from "./Ads/Ads";
import { UserSignUp, UserLogIn } from "./User/User";

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
      <Footer />
    </BrowserRouter>
  );
};

export default App;
