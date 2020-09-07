import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import { CircleToBlockLoading } from "react-loadingg";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Forum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [threadtypes, setThreadTypes] = useState([]);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    setIsLoading(true);
    if (cookies.get("isLoggedIn") == undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    console.log("COokies: ", cookies.get("isLoggedIn"));
    console.log("isLogedIn: ", isLoggedIn);
    fetchThreadTypes();
    fetchThreads();
    setIsLoading(false);
  }, []);

  useEffect(() => {});
  const fetchThreadTypes = () => {
    const url = "http://localhost:8000/forum/threadtypes/";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get(url, options).then((response) => setThreadTypes(response.data));
  };

  const fetchThreads = () => {
    const url = "http://localhost:8000/forum/threads/";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get(url, options).then((response) => setThreads(response.data));
  };

  return (
    <React.Fragment>
      {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
      {isLoggedIn ? (
        <MDBContainer>
          <MDBRow className="py-5 pt-5"></MDBRow>
          {threadtypes.map((type, index) => (
            <div key={index}>
              <h1 className="h1 text-center pt-5 black-text">
                {type.thread_type}
              </h1>
              {threads
                .filter((thread) => type.id === thread.thread_type)
                .map((thread, index) => (
                  <Link
                    key={index}
                    to={{
                      pathname: `/forum/${thread.id}`,
                      thread: {
                        thread_id: thread.id,
                        thread_title: thread.thread_title,
                        for_community: thread.for_community,
                      },
                    }}
                  >
                    <MDBCard>
                      <MDBCardBody>
                        <MDBRow className="py-5  mb-3">
                          <MDBCol sm="4">
                            <h3>
                              <strong className="black-text">
                                {thread.thread_title}
                              </strong>
                            </h3>
                          </MDBCol>
                          <MDBCol className="black-text">
                            {thread.thread_description}
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                    <br />
                  </Link>
                ))}
            </div>
          ))}
          <MDBRow className="py-5 pt-5"></MDBRow>
        </MDBContainer>
      ) : (
        <MDBContainer style={{ minHeight: "80vh" }}>
          <MDBRow className="py-5 pt-5"></MDBRow>
          <MDBCard>
            <MDBCardBody style={{ minHeight: "50vh" }}>
              <MDBRow className="py-5 pt-5"></MDBRow>
              <MDBRow className="py-5 pt-5"></MDBRow>
              <p className="h6 text-center py-4 black-text">
                You need to be logged in to use the forum.{" "}
                <a href="/login" className="blue-text">Login</a>
              </p>
              <MDBRow className="py-5 pt-5"></MDBRow>
            </MDBCardBody>
          </MDBCard>

          <MDBRow className="py-5 pt-5"></MDBRow>
        </MDBContainer>
      )}
    </React.Fragment>
  );
};

export default Forum;
