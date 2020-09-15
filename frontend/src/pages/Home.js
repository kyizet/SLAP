import React, { useState, useEffect } from "react";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBRow,
  MDBCardBody,
  MDBCard,
  MDBBtn,
} from "mdbreact";

const Home = () => {
  //Here goes all the states
  const [carousel, setCarousel] = useState([]);

  //Here goes all the effects
  useEffect(() => {
    fetchCarousel();
  }, []);

  //Here goes all the fucntions
  const fetchCarousel = () => {
    fetch("http://localhost:8000/backend/home/carousel-list")
      .then((res) => res.json())
      .then((data) => setCarousel(data));
  };

  return (
    <React.Fragment>
      <MDBCard className="morpheus-den-gradient">
        <MDBCardBody>
          <MDBRow className="py-5 my-5"></MDBRow>
          <div className="logo center"></div>
          <div className="text-center py-4 white-text">
            <h3>SLAP - the Small LAP</h3>
            <p>
              The recreation of the school with a complete gameplay that you can
              enjoy with your friends at LAP
            </p>
            <p>Download the game below to start your journey</p>
            <MDBBtn className="btn btn-outline-white mt-5 px-5" type="submit">
              Download
            </MDBBtn>
          </div>

          <MDBRow className="py-5 my-5"></MDBRow>
        </MDBCardBody>
      </MDBCard>
      <MDBCarousel
        activeItem={1}
        length={carousel.length}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          {carousel.map((item, index) => (
            <MDBCarouselItem itemId={index + 1} key={index}>
              <MDBView>
                <img
                  className="d-block w-100"
                  src={`http://localhost:8000/static${item.image}`}
                  alt="Could not be loaded"
                />
                <MDBMask overlay="black-light" />
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">{item.title}</h3>
                <p>{item.description}</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          ))}
        </MDBCarouselInner>
      </MDBCarousel>

    </React.Fragment>
  );
};

export default Home;
