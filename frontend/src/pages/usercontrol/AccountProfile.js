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

import axios from "axios";
import { CircleToBlockLoading } from "react-loadingg";
import { Redirect } from "react-router-dom";

const AccountProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const [userinfo, setUserInfo] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    update_profile_picture: null,
    profile_picture: null,
    date_of_birth: new Date().toLocaleString(),
  });

  useEffect(() => {
    if (isSubmit) {
      window.location.reload(false);
      setIsSubmit(false);
    }
  });
  useEffect(() => {
    fetchData();
    const cookies = new Cookies();
    if (!cookies.get("isLoggedIn")) {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchData = () => {
    const csrftoken = getCookie("csrf");
    const cookies = new Cookies();
    const url = "http://localhost:8000/usercontrol/userprofile";
    setIsLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Token " + cookies.get("token"),
        "X-CSRFToken": csrftoken,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserInfo(data));
    setIsLoading(false);
  };

  const updateData = (e) => {
    e.preventDefault();

    const csrftoken = getCookie("csrf");
    const cookies = new Cookies();
    const url = "http://localhost:8000/usercontrol/update";
    setIsLoading(true);

    let form_data = new FormData();
    if (userinfo.update_profile_picture) {
      form_data.append(
        "profile_picture",
        userinfo.update_profile_picture,
        userinfo.update_profile_picture.name
      );
    }
    form_data.append("date_of_birth", formatDate(userinfo.date_of_birth));
    form_data.append("email", userinfo.email);
    form_data.append("username", userinfo.username);
    form_data.append("first_name", userinfo.first_name);
    form_data.append("last_name", userinfo.last_name);
    axios.put(url, form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Token " + cookies.get("token"),
        "X-CSRFToken": csrftoken,
      },
    });
    setIsSubmit(true);
    setIsLoading(false);
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
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
    <div>
      {isLoggedIn ? "" : <Redirect to="/login" />}
      <MDBContainer>
        <MDBRow className="py-5"></MDBRow>

        <MDBRow>
          <MDBCol>
            <MDBCard className="py-5" style={{ opacity: 0.95 }}>
              {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
              <MDBCardBody className="px-5">
                <form className="px-5">
                  <p className="h4 text-center py-4 black-text">
                    Account Profile Details
                  </p>
                  <MDBRow>
                    <MDBCol sm="1">
                      <img
                        className="lightbox"
                        src={
                          userinfo.profile_picture === null
                            ? ""
                            : `http://localhost:8000/static${userinfo.profile_picture}`
                        }
                        width="40px"
                        height="40px"
                      />
                    </MDBCol>
                    <MDBCol>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroupFileAddon01"
                          >
                            Upload
                          </span>
                        </div>
                        <div className="custom-file">
                          <input
                            accept="image/png, image/jpeg, image/jpg"
                            type="file"
                            onChange={(e) =>
                              setUserInfo({
                                ...userinfo,
                                update_profile_picture: e.target.files[0],
                              })
                            }
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            {userinfo.update_profile_picture
                              ? userinfo.update_profile_picture.name
                              : "png/jpg/jpeg"}
                          </label>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <br />
                  <label
                    htmlFor="defaultFormCardNameExUsername"
                    className="black-text font-weight-light"
                  >
                    Username
                  </label>
                  <input
                    value={userinfo.username}
                    onChange={(e) =>
                      setUserInfo({ ...userinfo, username: e.target.value })
                    }
                    type="text"
                    id="defaultFormCardNameExUsername"
                    className="form-control"
                  />
                  <br />
                  <label
                    htmlFor="defaultFormCardEmailEx"
                    className="black-text font-weight-light"
                  >
                    E-mail
                  </label>
                  <input
                    disabled
                    value={userinfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userinfo, email: e.target.value })
                    }
                    type="email"
                    id="defaultFormCardEmailEx"
                    className="form-control"
                    autoComplete="on"
                  />
                  <br />
                  <label
                    htmlFor="defaultFormCardEmailExLastName"
                    className="black-text font-weight-light"
                  >
                    Last Name
                  </label>
                  <input
                    value={userinfo.last_name}
                    onChange={(e) =>
                      setUserInfo({ ...userinfo, last_name: e.target.value })
                    }
                    type="text"
                    id="defaultFormCardEmailExLastName"
                    className="form-control"
                    autoComplete="on"
                  />
                  <br />
                  <label
                    htmlFor="defaultFormCardEmailExFirstName"
                    className="black-text font-weight-light"
                  >
                    First Name
                  </label>
                  <input
                    value={userinfo.first_name}
                    onChange={(e) =>
                      setUserInfo({ ...userinfo, first_name: e.target.value })
                    }
                    type="text"
                    id="defaultFormCardEmailExFirstName"
                    className="form-control"
                    autoComplete="on"
                  />
                  <br />
                  <label
                    htmlFor="datepicker"
                    className="black-text font-weight-light"
                  >
                    Date of birth
                  </label>
                  <br />
                  <input
                    value={userinfo.date_of_birth}
                    type="date"
                    onChange={(e) =>
                      setUserInfo({
                        ...userinfo,
                        date_of_birth: e.target.value,
                      })
                    }
                  />
                  <div className="text-center py-4">
                    <MDBBtn
                      onClick={updateData}
                      className="btn btn-outline-black mt-5 px-5"
                      type="submit"
                    >
                      Save
                    </MDBBtn>
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

export default AccountProfile;
