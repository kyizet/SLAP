import React, { useState, useEffect } from "react";
import ApiService from "../../api";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Cookies from "universal-cookie";

import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBInput,
} from "mdbreact";
import { CircleToBlockLoading } from "react-loadingg";

const CheckoutCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const cookies = new Cookies();

  useEffect(() => {
    setIsLoading(true);
    fetchEmail();
    setAmount(cookies.get("totalPrice"));
    setIsLoading(false);
  }, []);

  const fetchEmail = () => {
    const url = "http://localhost:8000/usercontrol/userprofile";
    setIsLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Token " + cookies.get("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setEmail(data.email));
    setIsLoading(false);
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    ApiService.saveStripeInfo({
      email,
      amount,
      payment_method_id: paymentMethod.id,
    })
      .then((response) =>
        response.data.message === "Success" ? setPaymentSucceeded(true) : ""
      )
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MDBContainer>
      <MDBRow className="py-5"></MDBRow>
      {paymentSucceeded ? (
        <MDBContainer style={{ minHeight: "80vh" }}>
          <MDBRow className="py-5 pt-5"></MDBRow>
          <MDBCard>
            <MDBCardBody style={{ minHeight: "50vh" }}>
              <MDBRow className="py-5 pt-5"></MDBRow>
              <MDBRow className="py-5 pt-5"></MDBRow>
              <p className="h6 text-center py-4 black-text">
                Thank you for your donation. Enjoy!
              </p>
              <MDBRow className="py-5 pt-5"></MDBRow>
            </MDBCardBody>
          </MDBCard>

          <MDBRow className="py-5 pt-5"></MDBRow>
        </MDBContainer>
      ) : (
        <MDBRow>
          <MDBCol>
            <MDBCard className="py-5 scrollbar" style={{ minHeight: "55vh" }}>
              {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
              <MDBRow>
                <MDBCol>
                  <MDBCardBody className="px-5">
                    <h2 className="h1-responsive font-weight-bold text-center py-3">
                      Checkout Form
                    </h2>
                    <form onSubmit={handleSubmit} className="stripe-form">
                      <MDBInput
                        outline
                        disabled
                        label="Email"
                        type="email"
                        required
                        value={email}
                      />
                      <br />
                      <label
                        htmlFor="datepicker"
                        className="black-text font-weight-light"
                      >
                        Date of birth
                      </label>
                      <br />
                      <CardElement id="card-element" onChange={handleChange} />
                      <div className="text-center py-4">
                        <MDBBtn
                          className="btn btn-outline-black mt-5 px-5"
                          type="submit"
                        >
                          Submit
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      )}
      <MDBRow className="py-5"></MDBRow>
    </MDBContainer>
  );
};

export default CheckoutCart;
