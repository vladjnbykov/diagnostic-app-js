import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./components/Main";
import Login from "./components/Login";
import Admin from "./components/Admin";



import Footer from "./components/Footer";
import user from "./reducers/user";
import symptoms from "./reducers/symptoms";

const reducer = combineReducers({
  user: user.reducer,
  symptoms: symptoms.reducer,
});

const store = configureStore({ reducer });

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/symptoms" component={Admin} />
        </Switch>
        <Footer />

      </Provider>
    </BrowserRouter>
  );
};

export default App;
