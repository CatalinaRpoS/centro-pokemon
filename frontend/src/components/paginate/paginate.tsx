import React from "react";

const Paginate: React.FC<{
  pokemonesPerPage: number;
  totalPokemones: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}> = ({ pokemonesPerPage, totalPokemones, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemones / pokemonesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
