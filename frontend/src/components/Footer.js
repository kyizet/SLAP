import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <React.Fragment>
      <MDBFooter color="unique-color-dark" className="font-small pt-4">
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="6">
              <h3 className="title"> About </h3>{" "}
              <p>
                A game that guarantees you to LAP through your computer.{" "}
              </p>{" "}
            </MDBCol>{" "}
            <MDBCol md="6">
              <h5 className="title"> Social Media </h5>{" "}
              <ul>
                <li className="list-unstyled">
                  <a href="https://www.instagram.com/"> Instagram </a>{" "}
                </li>{" "}
                <li className="list-unstyled">
                  <a href="https://www.facebook.com/"> Facebook </a>{" "}
                </li>{" "}
                <li className="list-unstyled">
                  <a href="https://twitter.com/home"> Twitter </a>{" "}
                </li>{" "}
              </ul>{" "}
            </MDBCol>{" "}
          </MDBRow>{" "}
        </MDBContainer>{" "}
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()}
            Copyright:{" "}
            <a href="https://www.mdbootstrap.com"> slap.com </a>{" "}
          </MDBContainer>{" "}
        </div>{" "}
      </MDBFooter>
    </React.Fragment>
  );
};

export default Footer;
