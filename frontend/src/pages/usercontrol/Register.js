import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import { CircleToBlockLoading } from "react-loadingg";

import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
} from "mdbreact";

const Register = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordSame, setPasswordSame] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (password1 === password2) {
      setPasswordSame(true);
      setPasswordMessage("");
    } else {
      setPasswordSame(false);
      setPasswordMessage("The passwords are not the same");
    }
    if (password1 === "" && password2 === "") {
      setPasswordSame(false);
    }
  }, [password1, password2]);

  const handleRegister = (e) => {
    e.preventDefault();

    const csrftoken = getCookie("csrftoken");
    const url = "http://localhost:8000/usercontrol/register";

    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        email: email,
        password: password1,
      }),
    })
      .then((response) => response.json())
      .then((data) => setResponseMessage(data));
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
      {responseMessage.success === "Success" ? <Redirect to="/login" /> : ""}
      <MDBContainer>
        <MDBRow className="py-5"></MDBRow>

        <MDBRow>
          <MDBCol md="6"></MDBCol>

          <MDBCol md="6">
            <MDBCard className="pl-5 pr-5 py-5 " style={{ opacity: 0.95 }}>
              {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4 black-text">Register</p>

                  <label
                    htmlFor="defaultFormCardNameExEmail"
                    className="black-text font-weight-light"
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="defaultFormCardNameExEmail"
                    className="form-control"
                  />
                  <br />
                  <label
                    htmlFor="defaultFormCardEmailExPassword"
                    className="black-text font-weight-light"
                  >
                    Password
                  </label>
                  <input
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    type="password"
                    id="defaultFormCardEmailExPassword"
                    className="form-control"
                    autoComplete="on"
                  />
                  <br />
                  <label
                    htmlFor="defaultFormCardEmailExPasswordConfirm"
                    className="black-text font-weight-light"
                  >
                    Confirm Password
                  </label>
                  <input
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    type="password"
                    id="defaultFormCardEmailExPasswordConfirm"
                    className="form-control"
                    autoComplete="on"
                  />
                  <p className="h6 text-center py-4 red-text">
                    {passwordMessage}
                  </p>
                  <p className="h6 text-center py-4 black-text">
                    {responseMessage.response}
                    <br />
                    {responseMessage.email}
                    <br />
                    {responseMessage.password}
                  </p>
                  <div className="text-center py-4">
                    {passwordSame ? (
                      <MDBBtn
                        onClick={handleRegister}
                        className="btn btn-outline-black mt-5 px-5"
                        type="submit"
                      >
                        Register
                      </MDBBtn>
                    ) : (
                      <MDBBtn
                        disabled
                        className="btn btn-outline-black mt-5 px-5"
                        type="submit"
                      >
                        Register
                      </MDBBtn>
                    )}
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="py-5"></MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Register;
