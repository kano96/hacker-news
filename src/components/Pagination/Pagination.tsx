import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
          className={actualPage + 1 === i ? "activePage" : "inactivePage"}
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
        <FaAngleLeft onClick={() => changePage(actualPage - 1)} />
      </div>
      {getPages()}
      <div className="changePagebutton">
        <FaAngleRight onClick={() => changePage(actualPage + 1)} />
      </div>
    </div>
  );
};

export default Pagination;
