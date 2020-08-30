import React, { useState, useEffect } from "react";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBContainer,
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

      <MDBContainer>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold my-5">
            Why is it so great?
          </h2>
          <p className="lead grey-text w-responsive mx-auto mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
          <MDBRow>
            <MDBCol md="4">
              <MDBIcon icon="chart-area" size="3x" className="red-text" />
              <h5 className="font-weight-bold my-4">Analytics</h5>
              <p className="grey-text mb-md-0 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti hic.
              </p>
            </MDBCol>
            <MDBCol md="4">
              <MDBIcon icon="book" size="3x" className="cyan-text" />
              <h5 className="font-weight-bold my-4">Tutorials</h5>
              <p className="grey-text mb-md-0 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti hic.
              </p>
            </MDBCol>
            <MDBCol md="4">
              <MDBIcon far icon="comments" size="3x" className="orange-text" />
              <h5 className="font-weight-bold my-4">Support</h5>
              <p className="grey-text mb-md-0 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti hic.
              </p>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>
    </React.Fragment>
  );
};

export default Home;
