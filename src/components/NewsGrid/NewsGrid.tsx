import React from "react";
import New from "../New/New";

//Types
import { NewType } from "../../App";
type Props = {
  data: NewType[];
  favorites: NewType[];
  handleFavorites: (newItem: NewType) => void;
};

const NewsGrid: React.FC<Props> = ({ data, handleFavorites, favorites }) => {
  return (
    <div className="newsGrid">
      {data.map((item) => (
        <New
          key={item.objectID}
          item={item}
          id={item.objectID}
          handleFavorites={handleFavorites}
          favorites={favorites}
        />
      ))}
    </div>
  );
};

export default NewsGrid;
