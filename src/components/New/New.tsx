import React, { useState, useEffect } from "react";
import { FaClock, FaRegHeart } from "react-icons/fa";
//Types
import { NewType } from "../../App";

type Props = {
  item: NewType;
  id: number;
};

const New: React.FC<Props> = ({ item, id }) => {
  const [time, setTime] = useState(0);
  const [allParams, setAllParams] = useState<boolean>(true);

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
  const validate = () => {
    if (item.author && item.created_at && item.story_title && item.story_url)
      setAllParams(true);
    else {
      setAllParams(false);
    }
  };
  useEffect(() => {
    getTime();
    // validate();
  }, []);

  return (
    <>
      {allParams ? (
        <div className="new">
          <a href={item.story_url} className="newDetails">
            <div className="autor">
              <FaClock />
              <p>
                {time} hour ago by: {item.author}
              </p>
            </div>
            <div className="title">{item.story_title}</div>
          </a>
          <div className="favouriteButton">
            <FaRegHeart />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default New;
