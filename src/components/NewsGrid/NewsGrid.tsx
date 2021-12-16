import React from "react";
import New from "../New/New";

//Types
import { NewType } from "../../App";
type Props = {
  data: NewType[];
};

const NewsGrid: React.FC<Props> = ({ data }) => {
  return (
    <div className="newsGrid">
      {data.map((item) => (
        <New key={item.objectID} item={item} id={item.objectID} />
      ))}
    </div>
  );
};

export default NewsGrid;
