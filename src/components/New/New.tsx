import React, { useState, useEffect } from "react";
import { FaClock, FaRegHeart, FaHeart } from "react-icons/fa";
//Styles
import "./New.css";
//Types
import { NewType } from "../../App";

type Props = {
  item: NewType;
  favorites: NewType[];
  id: string;
  handleFavorites: (newItem: NewType) => void;
};

const New: React.FC<Props> = ({ item, handleFavorites, favorites }) => {
  //states
  const [time, setTime] = useState(0);
  const [allParams, setAllParams] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>();

  //get hours
  const getTime = () => {
    try {
      const actualDate = Date.now();
      const publishDate = new Date(item.created_at).getTime();
      const diference = (actualDate - publishDate) / 1000;
      setTime(Math.abs(Math.ceil(diference / (60 * 60))));
    } catch {
      setTime(0);
    }
  };

  const validateFavorite = () => {
    const findFavorite = favorites.find((i) => i.objectID === item.objectID);
    if (findFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  //validate data
  const validate = () => {
    if (item.author && item.created_at && item.title && item.url)
      setAllParams(true);
    else {
      setAllParams(false);
    }
  };

  //secondary effects
  useEffect(() => {
    getTime();
    validate();
    validateFavorite();
  }, [favorites]);

  return (
    <>
      {allParams ? (
        <div className="new">
          <a href={item.url} className="newDetails" target="_blank">
            <div className="autor">
              <FaClock />
              <p>
                {time} hour ago by: {item.author}
              </p>
            </div>
            <div className="title">{item.title}</div>
          </a>
          <div
            className="favouriteButton"
            onClick={() => {
              handleFavorites(item);
              setIsFavorite(!isFavorite);
            }}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default New;
