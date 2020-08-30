import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
import { CircleToBlockLoading } from "react-loadingg";
import Cookies from "universal-cookie";
import axios from "axios";
import { Redirect } from "react-router-dom";

const TopicDetail = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    topic_title: "",
    topic_content: "",
  });
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (props.location.topic) {
      cookies.set("topic_id", props.location.topic.id);
    }
    fetchTopicDetail(cookies.get("topic_id"));
    fetchComments();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTopicDetail(data.id);
  }, [setIsEdit]);

  const fetchTopicDetail = (pk) => {
    const cookies = new Cookies();
    const csrftoken = getCookie("csrf");
    const url = `http://localhost:8000/forum/topic/${pk}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + cookies.get("token"),
        "X-CSRFToken": csrftoken,
      },
    };
    axios
      .get(url, options)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  const updateTopicDetail = () => {
    const cookies = new Cookies();
    const csrftoken = getCookie("csrf");
    const url = `http://localhost:8000/forum/updatetopic/${data.id}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + cookies.get("token"),
        "X-CSRFToken": csrftoken,
      },
    };
    axios
      .put(
        url,
        {
          topic_title: editData.topic_title,
          topic_content: editData.topic_content,
        },
        options
      )
      .then((response) =>
        response.status === 200 ? fetchTopicDetail(response.data.id) : ""
      )
      .catch((err) => console.log(err));
    setIsEdit(false);
  };

  const deleteTopic = () => {
    const cookies = new Cookies();
    const csrftoken = getCookie("csrf");
    const url = `http://localhost:8000/forum/deletetopic/${data.id}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + cookies.get("token"),
        "X-CSRFToken": csrftoken,
      },
    };
    axios
      .delete(url, options)
      .then((response) => (response.status === 200 ? setIsDeleted(true) : ""));
  };

  const addComment = (e) => {
    setIsLoading(true);
    const cookies = new Cookies();
    const csrftoken = getCookie("csrf");
    const url = "http://localhost:8000/forum/addcomment/";
    const options = {
      "Content-Type": "application/json",
      Authorization: "Token " + cookies.get("token"),
      "X-CSRFToken": csrftoken,
    };
    const data = {
      comment_text: comment,
      topic_title: cookies.get("topic_id"),
    };
    axios
      .post(url, data, {
        headers: options,
      })
      .then(() => fetchComments());
    setComment("");
    setIsLoading(false);
  };

  const fetchComments = () => {
    const cookies = new Cookies();
    const csrftoken = getCookie("csrf");
    const url = `http://localhost:8000/forum/comments/${cookies.get(
      "topic_id"
    )}`;
    const options = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    };
    axios.get(url, options).then((response) => setComments(response.data));
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
      {isDeleted ? <Redirect to="/forum" /> : ""}
      <MDBContainer style={{ minHeight: "80vh" }}>
        <MDBRow className="py-5 pb-5 pt-5 mb-5 mt-5 mb-5"></MDBRow>
        {data.isOwner ? (
          <div className="text-right mb-3">
            {isEdit ? (
              <MDBBtn
                outline
                color="black"
                className="text-left"
                onClick={(e) => {
                  setIsEdit(false);
                }}
              >
                Undo
              </MDBBtn>
            ) : (
              <MDBBtn
                outline
                color="black"
                className="text-left"
                onClick={(e) => {
                  setEditData({
                    topic_title: data.topic_title,
                    topic_content: data.topic_content,
                  });
                  setIsEdit(true);
                }}
              >
                Edit
              </MDBBtn>
            )}
            <MDBBtn outline color="red" onClick={deleteTopic}>
              Delete
            </MDBBtn>
          </div>
        ) : (
          ""
        )}
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle className="text-center">
              {isEdit ? (
                <input
                  type="text"
                  maxLength="200"
                  className="form-control"
                  value={editData.topic_title}
                  onChange={(e) =>
                    setEditData({ ...editData, topic_title: e.target.value })
                  }
                />
              ) : (
                <strong>{data.topic_title}</strong>
              )}
            </MDBCardTitle>
            <hr />
            {isEdit ? (
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="10"
                style={{ resize: "none" }}
                value={editData.topic_content}
                onChange={(e) =>
                  setEditData({ ...editData, topic_content: e.target.value })
                }
              />
            ) : (
              <MDBCardText>{data.topic_content}</MDBCardText>
            )}
            <hr />
            <MDBRow>
              <MDBCol>
                <img
                  src={
                    data.topic_author_picture !== undefined
                      ? `http://localhost:8000/static${data.topic_author_picture}`
                      : ""
                  }
                  alt="not avaialble"
                  width="40px"
                  height="40px"
                />
                {data.topic_author}
              </MDBCol>
              {isEdit ? (
                <MDBBtn
                  className="text-center"
                  outline
                  color="dark"
                  onClick={updateTopicDetail}
                >
                  Update
                </MDBBtn>
              ) : (
                ""
              )}
              <MDBCol>
                <MDBRow>
                  <MDBCol className="text-right">Created on:</MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol className="text-right">
                    {data.created_date ? data.created_date.split("T")[0] : ""}
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBCardBody>
            {comments.map((comment, index) => (
              <div key={index}>
                <MDBRow>
                  <MDBCol>{comment.comment_text}</MDBCol>
                  <MDBCol sm="2">{comment.comment_author}</MDBCol>
                </MDBRow>
                <hr />
              </div>
            ))}
          </MDBCardBody>
        </MDBCard>
        {isEdit ? (
          ""
        ) : cookies.get("token") === undefined ? (
          ""
        ) : (
          <MDBCard>
            <MDBCardBody>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a comment"
                  aria-label="Username"
                  aria-describedby="basic-addon"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={(e) => (e.key === "Enter" ? addComment() : "")}
                />
                <div className="input-group-prepend">
                  <span
                    className="input-group-text button"
                    id="basic-addon"
                    style={{ backgroundColor: "white" }}
                    onClick={addComment}
                  >
                    <MDBIcon far icon="comment-alt" />
                  </span>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        )}
        <MDBRow className="py-5 pb-5 pt-5 mb-5 mt-5 mb-5"></MDBRow>
      </MDBContainer>
    </div>
  );
};

export default TopicDetail;
