import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import CreateCarrierPostFormContainer from './carrier_posts/create_carrier_post_form_container';
import EditCarrierPostFormContainer from './carrier_posts/edit_carrier_post_form_container';
import CarrierPostShowContainer from './carrier_posts/carrier_post_show_container';
import CarrierPostListContainer from './carrier_posts/carrier_post_list_container';
import CreateShipperPostFormContainer from './shipper_posts/create_shipper_post_form_container';
import EditShipperPostFormContainer from './shipper_posts/edit_shipper_post_form_container';
import ShipperPostShowContainer from './shipper_posts/shipper_post_show_container';
import ShipperPostListContainer from './shipper_posts/shipper_post_list_container';


const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/carriers/posts/create" component={CreateCarrierPostFormContainer} />
      <ProtectedRoute exact path="/carriers/posts/:carrierPostId/edit" component={EditCarrierPostFormContainer} />
      <ProtectedRoute exact path="/shippers/posts/create" component={CreateShipperPostFormContainer} />
      <ProtectedRoute exact path="/shippers/posts/:shipperPostId/edit" component={EditShipperPostFormContainer} />

      <Route exact path="/carriers/posts/:carrierPostId" component={CarrierPostShowContainer} />
      <Route exact path="/carriers/posts" component={CarrierPostListContainer} />
      <Route exact path="/shippers/posts/:shipperPostId" component={ShipperPostShowContainer} />
      <Route exact path="/shippers/posts" component={ShipperPostListContainer} />

    </Switch>
  </div>
);

export default App;
