import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./Pagination.css";

type Props = {
  actualPage: number;
  changePage: (page: number) => void;
};

const pagesNumber = 9;
const Pagination: React.FC<Props> = ({ actualPage, changePage }) => {
  const getPages = (): number[] => {
    let result: any[] = [];
    for (let i = 1; i <= pagesNumber; i++) {
      result.push(
        <div
          className={actualPage === i ? "activePage" : "inactivePage"}
          key={`page${i}`}
          onClick={() => changePage(i)}
        >
          {i}
        </div>
      );
    }
    return result;
  };
  return (
    <div className="Pagination">
      <div className="changePagebutton">
        <FaAngleLeft
          onClick={() => {
            if (actualPage > 0) changePage(actualPage - 1);
          }}
        />
      </div>
      {getPages()}
      <div className="changePagebutton">
        <FaAngleRight
          onClick={() => {
            if (actualPage < pagesNumber) changePage(actualPage + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
