import React, { useState, useEffect } from "react";
import { CircleToBlockLoading } from "react-loadingg";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
} from "mdbreact";
import Cookies from "universal-cookie";
import axios from "axios";
import { Redirect } from "react-router-dom";

const CreateTopic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicContent, setTopicContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    if (!cookies.get("isLoggedIn")) {
      setIsLoggedIn(false);
    }
  }, []);

  const addTopic = (e) => {
    setIsLoading(true);

    const csrftoken = getCookie("csrf");
    const cookies = new Cookies();
    const url = "http://localhost:8000/forum/addtopic/";
    const options = {
      "Content-Type": "application/json",
      Authorization: "Token " + cookies.get("token"),
      "X-CSRFToken": csrftoken,
    };
    const data = {
      topic_title: topicTitle,
      topic_content: topicContent,
      thread_title: cookies.get("thread_id"),
    };
    axios
      .post(url, data, {
        headers: options,
      })
      .then((response) => setResponse(response))
      .catch((err) => console.log(err));
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
  const cookies = new Cookies();
  return (
    <div>
      {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
      {isLoggedIn ? "" : <Redirect to="/login" />}
      {response.status === 200 ? (
        <div>
          <Redirect to={`/topic/${response.data.slug}`} />
          {cookies.set('topic_id', response.data.id)}
        </div>
      ) : (
        ""
      )}

      <MDBContainer style={{ minHeight: "80vh" }}>
        <MDBRow className="py-5 pb-5 pt-5 mb-5 mt-5 mb-5"></MDBRow>
        <MDBCard className="py-5">
          <MDBCardTitle className="text-center">
            <strong className="border-bottom h3">Start a topic</strong>
          </MDBCardTitle>
          <MDBCardBody>
            <div className="form-group">
              <input
                type="text"
                maxLength="200"
                className="form-control"
                placeholder="What's your topic about? Be unique!"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="10"
                placeholder="Describe it"
                style={{ resize: "none" }}
                value={topicContent}
                onChange={(e) => setTopicContent(e.target.value)}
              />
            </div>
            <div className="text-center py-4">
              <MDBBtn
                className="btn btn-outline-black mt-5 px-5"
                type="submit"
                onClick={addTopic}
              >
                Create
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
        <MDBRow className="py-5 pb-5 pt-5 mb-5 mt-5 mb-5"></MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CreateTopic;
