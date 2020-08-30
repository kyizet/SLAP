import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const Logout = () => {
  useEffect(() => {
    const cookies = new Cookies();
    cookies.remove("token");
    cookies.remove("isLoggedIn");
    const url = "http://localhost:8000/rest-auth/logout/";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    window.location.reload(false);
  }, []);

  return <Redirect to="/" />;
};

export default Logout;