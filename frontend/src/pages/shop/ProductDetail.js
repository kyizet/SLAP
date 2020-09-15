import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBCardImage,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import Cookies from "universal-cookie";
import { CircleToBlockLoading } from "react-loadingg";
import { Link } from "react-router-dom";

const ProductDetail = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modal, setModal] = useState(false);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const cookies = new Cookies();
    setIsLoading(true);
    if (cookies.get("isLoggedIn") == undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    if (props.location.productProps) {
      cookies.set("product", props.location.productProps);
      setProduct(cookies.get("product"));
    } else {
      setProduct(cookies.get("product"));
    }
    setIsLoading(false);
  }, []);

  const addToCart = () => {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <MDBContainer>
        <MDBRow className="py-5"></MDBRow>

        <h2 className="h1-responsive font-weight-bold text-center my-5">
          Item Detail
        </h2>
        <MDBRow>
          <MDBCol>
            <MDBCard className="py-5" style={{ opacity: 0.95 }}>
              {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
              <MDBRow>
                <MDBCol sm="4">
                  <MDBContainer>
                    <MDBCardImage
                      style={{ height: "30vh" }}
                      src={`http://localhost:8000/static${product.product_image}`}
                      top
                      alt="Photo could not be loaded"
                      overlay="white-slight"
                    />
                  </MDBContainer>
                </MDBCol>
                <MDBCol sm="8">
                  <MDBCardBody className="px-5">
                    <MDBRow>
                      <MDBCol sm="4">
                        <strong>
                          <p className=" w-responsive mx-auto">Product Name:</p>
                        </strong>
                      </MDBCol>
                      <MDBCol sm="8">
                        <p className=" w-responsive mx-auto">
                          {product.product_name}
                        </p>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm="4">
                        <strong>
                          <p className=" w-responsive mx-auto">Product Type:</p>
                        </strong>
                      </MDBCol>
                      <MDBCol sm="8">
                        <p className=" w-responsive mx-auto">
                          {product.product_type}
                        </p>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm="4">
                        <strong>
                          <p className=" w-responsive mx-auto">
                            Product Price:
                          </p>
                        </strong>
                      </MDBCol>
                      <MDBCol sm="8">
                        <p className=" w-responsive mx-auto">
                          ${product.product_price}
                        </p>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm="4">
                        <strong>
                          <p className=" w-responsive mx-auto">
                            Product Description:
                          </p>
                        </strong>
                      </MDBCol>
                      <MDBCol sm="8">
                        <p className=" w-responsive mx-auto">
                          {product.product_description}
                        </p>
                      </MDBCol>
                    </MDBRow>
                    {isLoggedIn ? (
                      <form className="px-5">
                        <div className="text-center py-4">
                          <MDBBtn
                            onClick={() => {
                              addToCart();
                              toggle();
                            }}
                            color="btn-outline-black mt-5 px-5"
                          >
                            Add to cart.
                          </MDBBtn>
                          <MDBModal isOpen={modal} toggle={toggle}>
                            <MDBModalHeader toggle={toggle}>
                              Add to cart.
                            </MDBModalHeader>
                            <MDBModalBody>
                              Successfully added the item to your shopping cart.
                            </MDBModalBody>
                            <MDBModalFooter>
                              <MDBBtn
                                color="btn-outline-black"
                                onClick={toggle}
                              >
                                Close
                              </MDBBtn>
                              <Link to="/checkoutcart">
                                <MDBBtn color="btn-outline-black" className="black-text">
                                  Check your shopping cart.
                                </MDBBtn>
                              </Link>
                            </MDBModalFooter>
                          </MDBModal>
                        </div>
                      </form>
                    ) : (
                      <h5 className="text-center py-4">
                        <a href="/login">Log in</a> to add this item to cart
                      </h5>
                    )}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="py-5"></MDBRow>
      </MDBContainer>
    </div>
  );
};
export default ProductDetail;
