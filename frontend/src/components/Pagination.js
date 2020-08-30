import React from "react";
import { MDBPageItem, MDBPageNav, MDBPagination } from "mdbreact";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <MDBPagination size="sm">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <MDBPageItem key={number}>
            <MDBPageNav onClick={() => paginate(number)}>{number}</MDBPageNav>
          </MDBPageItem>
        ))}
      </ul>
    </MDBPagination>
  );
};

export default Pagination;
