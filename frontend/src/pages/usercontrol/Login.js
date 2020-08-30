import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
} from "mdbreact";
import { Redirect } from "react-router-dom";
import { CircleToBlockLoading } from "react-loadingg";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [response, setResponse] = useState();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const csrftoken = getCookie("csrf");
    const url = "http://localhost:8000/usercontrol/login";

    const cookies = new Cookies();
    setIsLoading(true);
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        if (data.non_field_errors) {
          setIsError(true);
        } else {
          cookies.set("token", data.token);
          cookies.set("isLoggedIn", true);
          setIsLoggedIn(true);
          window.location.reload(false);
        }
      });

    setIsLoading(false);
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <div className="">
      {isLoggedIn ? <Redirect to="/" /> : ""}
      <MDBContainer>
        <MDBRow className="py-5"></MDBRow>

        <MDBRow>
          <MDBCol md="6"></MDBCol>

          <MDBCol md="6">
            <MDBCard className="pl-5 pr-5 py-5 " style={{ opacity: 0.95 }}>
              {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4 black-text">Login</p>
                  <label
                    htmlFor="defaultFormCardNameExUsername"
                    className="black-text font-weight-light"
                  >
                    E-mail
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="defaultFormCardNameExUsername"
                    className="form-control"
                  />
                  <br />
                  <label
                    htmlFor="defaultFormCardEmailEx"
                    className="black-text font-weight-light"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="defaultFormCardEmailEx"
                    className="form-control"
                    autoComplete="on"
                  />
                  <p className="h6 text-center py-4 red-text">
                    {isError ? response.non_field_errors : ""}
                  </p>
                  <div className="text-center py-4">
                    <MDBBtn
                      onClick={handleLogin}
                      className="btn btn-outline-black mt-5 px-5"
                      type="submit"
                    >
                      Login
                    </MDBBtn>
                    <p className="h6 text-center py-4 black-text">
                      Forgotten password?
                    </p>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
            <MDBRow className="py-5"></MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
