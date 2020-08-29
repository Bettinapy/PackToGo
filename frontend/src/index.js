import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";

import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions.js";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    store = configureStore({});
  }
  const root = document.getElementById("root");

  function runOnScroll() {
    let searchBar = document.getElementById("search-bar");
    let searchBox = document.getElementById("search-box")
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      if (searchBar){
        if (!searchBar.classList.contains("hide-search")) {
          searchBar.classList.add("hide-search")
        }
      }
      if (searchBox){
        if(searchBar){
          if (searchBar.classList.contains("show-search")){
            searchBar.classList.remove("show-search")
          }
        }
        searchBox.classList.add("show-search")
      }
    } else {
      if (searchBox) {
        if(searchBox.classList.contains("show-search")){
          searchBox.classList.remove("show-search")
        }
      }
      if (searchBar) {
        if (searchBar.classList.contains("hide-search")){
          searchBar.classList.remove("hide-search")
        }
      }
    }
  }; 

  window.addEventListener("scroll", runOnScroll);

  ReactDOM.render(<Root store={store} />, root);
});
