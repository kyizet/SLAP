import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBContainer,
  MDBIcon,
} from "mdbreact";
import { Link } from "react-router-dom";
import { CircleToBlockLoading } from "react-loadingg";

const Shop = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [productOnpage, setProductOnPage] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const [selectedProductType, setSelectedProductType] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchProductTypes();
    fetchProductAll();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchByType();
    setIsLoading(false);
  }, [selectedProductType]);

  const fetchProductTypes = async () => {
    const url = "http://localhost:8000/shop/product-types/";
    await fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProductTypes(data));
  };

  const fetchProductAll = async () => {
    const url = "http://localhost:8000/shop/productall/";
    await fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProductOnPage(data));
  };

  const fetchByType = async () => {
    const url = `http://localhost:8000/shop/product/${selectedProductType}`;
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => setProductOnPage(data));
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productOnpage.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MDBContainer>
      {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
      <MDBRow className="py-5"></MDBRow>
      <section className="text-center my-5">
        <h2 className="h1-responsive font-weight-bold text-center my-5">
          Shop
        </h2>
        <MDBRow>
          <MDBCol sm="7"></MDBCol>
          <MDBCol sm="1">
            <Link to="/checkoutcart">
              <MDBIcon
                icon="shopping-cart"
                size="2x"
                className="button amber-text"
              />
            </Link>
          </MDBCol>
          <MDBCol sm="4">
            <div className="form-group">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here"
                type="text"
                id="example3"
                className="form-control form-control-sm"
              />
            </div>
          </MDBCol>
        </MDBRow>
        <p
          className="button text-center w-responsive mx-auto mb-5 h5"
          onClick={() => fetchProductAll()}
        >
          All
        </p>

        <MDBRow>
          {productTypes.map((productType, index) => (
            <MDBCol key={index}>
              <p
                className="button text-center w-responsive mx-auto mb-5"
                onClick={() => setSelectedProductType(productType.product_type)}
              >
                {productType.product_type}
              </p>
            </MDBCol>
          ))}
        </MDBRow>
        <MDBRow>
          {currentProducts.map((product, index) =>
            search !== "" &&
            product.product_name.toLowerCase().indexOf(search.toLowerCase()) ===
              -1 ? null : (
              <MDBCol lg="3" md="6" className="mb-lg-0 mb-5 my-5" key={index}>
                <Link
                  to={{
                    pathname: `/shop/${product.id}`,
                    productProps: {
                      id: product.id,
                      product_name: product.product_name,
                      product_image: product.product_image,
                      product_description: product.product_description,
                      product_price: product.product_price,
                      product_type: product.product_type,
                    },
                  }}
                >
                  <MDBCard className="align-items-center h-100">
                    <MDBCardImage
                      style={{ height: "30vh" }}
                      src={`http://localhost:8000/static${product.product_image}`}
                      top
                      alt="Photo could not be loaded"
                      overlay="white-slight"
                    />
                    <MDBCardBody className="text-center">
                      <h5 className="grey-text">{product.product_type}</h5>
                      <h5>
                        <strong className="dark-grey-text">
                          {product.product_name}
                        </strong>
                      </h5>
                      <h4 className="font-weight-bold  cyan-text">
                        <strong>${product.product_price}</strong>
                      </h4>
                    </MDBCardBody>
                  </MDBCard>
                </Link>
              </MDBCol>
            )
          )}
        </MDBRow>
        <MDBRow className="py-5"></MDBRow>
        <MDBRow>
          <MDBCol></MDBCol>
          <MDBCol>
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={productOnpage.length}
              paginate={paginate}
            />
          </MDBCol>
          <MDBCol></MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
};

export default Shop;
