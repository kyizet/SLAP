import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
import { CircleToBlockLoading } from "react-loadingg";
import Cookies from "universal-cookie";

const CheckoutCart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setCartItems(JSON.parse(localStorage.getItem("cart")));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    var temp = 0;
    cartItems.map((item) => {
      temp += item.product_price;
    });
    setTotalPrice(temp);
    cookies.set("totalPrice", temp);
  });

  const deleteItem = (itemIndex) => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems.filter((item, index) => index !== itemIndex))
    );
    setCartItems(JSON.parse(localStorage.getItem("cart")));
  };

  return (
    <MDBContainer>
      <MDBRow className="py-5"></MDBRow>

      <MDBRow>
        <MDBCol>
          <MDBCard className="py-5 scrollbar" style={{ minHeight: "55vh" }}>
            {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
            <MDBRow>
              <MDBCol>
                <MDBCardBody className="px-5">
                  <h2 className="h1-responsive font-weight-bold text-center py-3">
                    Your shopping cart
                  </h2>
                  <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th>
                          <strong>#</strong>
                        </th>
                        <th>
                          <strong>Item Image</strong>
                        </th>
                        <th>
                          <strong>Item Name</strong>
                        </th>
                        <th>
                          <strong>Item Type</strong>
                        </th>
                        <th>
                          <strong>Item Price</strong>
                        </th>
                        <th></th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody
                      style={{
                        overflowY: "scroll",
                      }}
                    >
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={`http://localhost:8000/static${item.product_image}`}
                              width="50px"
                              height="50px"
                            />
                          </td>
                          <td>{item.product_name}</td>
                          <td>{item.product_type}</td>
                          <td>{item.product_price}</td>
                          <td
                            className="button"
                            onClick={() => deleteItem(index)}
                          >
                            X
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <td></td>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <strong>${Math.round((totalPrice + Number.EPSILON) * 100) / 100}</strong>
                        </td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                  <form className="px-5">
                    <div className="text-center">
                      <Link to="/checkoutform">
                        <MDBBtn
                          color="btn-outline-black"
                          className="black-text mt-5 px-5"
                          type="submit"
                        >
                          Checkout
                        </MDBBtn>
                      </Link>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow className="py-5"></MDBRow>
    </MDBContainer>
  );
};

export default CheckoutCart;
