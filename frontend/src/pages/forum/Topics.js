import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import axios from "axios";
import Cookies from "universal-cookie";
import { CircleToBlockLoading } from "react-loadingg";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { Link } from "react-router-dom";

const Topics = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [forCommunity, setForCommunity] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [topicsPerPage] = useState(8);

  useEffect(() => {
    setIsLoading(true);
    const cookies = new Cookies();
    if (props.location.thread) {
      cookies.set("thread_id", props.location.thread.thread_id);
      cookies.set("thread_title", props.location.thread.thread_title);
      cookies.set("for_community", props.location.thread.for_community);
    }
    if (cookies.get("for_community") === "true") {
      setForCommunity(true);
    } else {
      setForCommunity(false);
    }
    fetchTopics(cookies.get("thread_id"));
    setIsLoading(false);
  }, []);

  useEffect(() => {});

  const fetchTopics = (pk) => {
    const url = `http://localhost:8000/forum/topics/${pk}`;
    const options = {
      header: {
        "Content-Type": "application/json",
      },
    };
    axios.post(url, options).then((response) => setData(response.data));
  };

  const cookies = new Cookies();
  const indexOfLastTopic = currentPage * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = data.slice(indexOfFirstTopic, indexOfLastTopic);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
      <MDBContainer style={{ minHeight: "80vh" }}>
        <MDBRow className="py-5 pt-5"></MDBRow>
            <h2 className="h1 text-center black-text">
              {cookies.get("thread_title")}
            </h2>
            {forCommunity ? (
              <Link
                to={{
                  pathname: "/createtopic",
                }}
              >
                <div className="text-right my-3 mb-3">
                  <MDBBtn outline color="black">
                    Create a topic
                  </MDBBtn>
                </div>
              </Link>
            ) : (
              ""
            )}

        {currentTopics.map((topic, index) => (
          <Link
            key={index}
            to={{
              pathname: `/topic/${topic.topic_slug}`,
              topic: {
                id: topic.id,
              },
            }}
          >
            <MDBCard>
              <MDBCardBody>
                <MDBRow className="black-text">
                  <MDBCol>
                    <MDBRow>
                      <MDBCol>
                        <h4>
                          <strong>{topic.topic_title}</strong>
                        </h4>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol>Author: {topic.topic_author}</MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol>
                    <MDBRow>
                      <MDBCol className="text-right">Created on:</MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol className="text-right">
                        {topic.created_date.split("T")[0]}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <br />
          </Link>
        ))}
        <MDBRow className="py-5 pt-5"></MDBRow>

        <MDBRow>
          <MDBCol></MDBCol>
          <MDBCol>
            <Pagination
              itemsPerPage={topicsPerPage}
              totalItems={data.length}
              paginate={paginate}
            />
          </MDBCol>
          <MDBCol></MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Topics;
