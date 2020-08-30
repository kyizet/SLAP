import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBCardImage,
} from "mdbreact";
import Cookies from "universal-cookie";
import { CircleToBlockLoading } from "react-loadingg";

const ProductDetail = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    if (props.location.productProps) {
      cookies.set("product", props.location.productProps);
      setProduct(cookies.get("product"));
    } else {
      setProduct(cookies.get("product"));
    }
  }, []);

  const addToCart = (e) => {
    e.preventDefault();
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
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
            <MDBCard
              className="py-5"
              style={{ opacity: 0.95 }}
              style={{
                maxHeight: "70vh",
                minHeight: "70vh",
              }}
            >
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
                    <form className="px-5">
                      <div className="text-center py-4">
                        <MDBBtn
                          onClick={addToCart}
                          className="btn btn-outline-black mt-5 px-5"
                          type="submit"
                        >
                          Add to Cart
                        </MDBBtn>
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
    </div>
  );
};
export default ProductDetail;
