import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import CreateCarrierPostFormContainer from './carrier_posts/create_carrier_post_form_container';
import EditCarrierPostFormContainer from './carrier_posts/edit_carrier_post_form_container';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/carriers/posts/create" component={CreateCarrierPostFormContainer} />
      <ProtectedRoute exact path="/carriers/posts/:carrierPostId/edit" component={EditCarrierPostFormContainer} />
    
    </Switch>
  </div>
);

export default App;
