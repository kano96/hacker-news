import React from "react";

type Props = {
  view: string;
  handleChangeView: (view: "All" | "Fav") => void;
};

const Selector: React.FC<Props> = ({ handleChangeView, view }) => {
  return (
    <div className="selectButtons">
      <div
        className={view === "All" ? "selectedButton" : "unselectedButton"}
        onClick={() => handleChangeView("All")}
      >
        All
      </div>
      <div
        className={view === "Fav" ? "selectedButton" : "unselectedButton"}
        onClick={() => handleChangeView("Fav")}
      >
        My faves
      </div>
    </div>
  );
};

export default Selector;
