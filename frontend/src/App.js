import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/shop/Shop";
import ProductDetail from "./pages/shop/ProductDetail";
import CheckoutCart from "./pages/shop/CheckoutCart";

import Forum from "./pages/forum/Forum";
import Topics from "./pages/forum/Topics";
import TopicDetail from "./pages/forum/TopicDetail";
import CreateTopic from "./pages/forum/CreateTopic";

import ChangeLog from "./pages/ChangeLog";
import Help from "./pages/Help";

import Login from "./pages/usercontrol/Login";
import Register from "./pages/usercontrol/Register";
import Logout from "./pages/usercontrol/Logout";
import AccountProfile from "./pages/usercontrol/AccountProfile";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/shop/:id" component={ProductDetail} />
        <Route path="/checkoutcart" component={CheckoutCart} />

        <Route path="/forum" exact component={Forum} />
        <Route path="/forum/:id" component={Topics} />
        <Route path="/topic/:slug" component={TopicDetail} />
        <Route path="/createtopic" component={CreateTopic} />

        <Route path="/help" component={Help} />
        <Route path="/changelog" component={ChangeLog} />

        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
        <Route path="/accountprofile" component={AccountProfile} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
