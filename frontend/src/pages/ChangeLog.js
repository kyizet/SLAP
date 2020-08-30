import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBTypography,
  MDBBox,
} from "mdbreact";
import { CircleToBlockLoading } from "react-loadingg";

const About = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedVersion, setSelectedVersion] = useState("");
  const [versionData, setVersionData] = useState([]);
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    fetchVersions();
  }, []);

  useEffect(() => {
    fetchVersionData();
  }, [selectedVersion]);

  useEffect(() => {
    const temp = versions.slice(-1)[0];
    if (temp !== undefined) {
      setSelectedVersion(temp["version_number"]);
    }
  }, [versions]);

  const fetchVersions = () => {
    setIsLoading(true);
    fetch("http://localhost:8000/backend/changelog-versions/")
      .then((res) => res.json())
      .then((data) => setVersions(data));
    setIsLoading(false);
  };

  const fetchVersionData = () => {
    setIsLoading(true);
    const csrftoken = getCookie("csrf");
    const url = `http://localhost:8000/backend/changelogs/${selectedVersion}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((response) => response.json())
      .then((data) => setVersionData(data));
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
    <React.Fragment>
      <div className="">
        <MDBContainer>
          <MDBRow className="py-5"></MDBRow>

          <MDBRow>
            <MDBCol>
              <MDBCard
                className="pl-5 pr-5 py-5"
                style={{ opacity: 0.95 }}
              >
                {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
                <MDBCardBody className="px-5">
                  <select
                    value={selectedVersion}
                    onChange={(e) => setSelectedVersion(e.target.value)}
                    className="browser-default custom-select mb-4 blue-grey lighten-5"
                    id="select"
                  >
                    {versions
                      .slice(0)
                      .reverse()
                      .map((version, index) => (
                        <option key={index} value={version.version_number}>
                          Version {version.version_number}
                        </option>
                      ))}
                  </select>
                  <hr />
                  <br />
                  <div
                    style={{
                      maxHeight: "50vh",
                      minHeight: "50vh",
                      overflowY: "scroll",
                    }}
                    className="scrollbar"
                  >
                    {versionData.map((data, index) => (
                      <div key={index}>
                        <MDBTypography tag="h5">
                          <MDBBox tag="u" className="black-text">
                            {data.title}
                          </MDBBox>
                        </MDBTypography>
                        <MDBBox tag="p" className="lead black-text">
                          {data.description}
                        </MDBBox>
                        <br />
                        <hr />
                      </div>
                    ))}
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow className="py-5"></MDBRow>
        </MDBContainer>
      </div>
    </React.Fragment>
  );
};

export default About;
