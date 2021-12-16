import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

//logos
import angularlogo from "../../assets/filtersIMG/angular.jpg";
import reactlogo from "../../assets/filtersIMG/react.png";
import vuelogo from "../../assets/filtersIMG/vue.png";

//Types

type Props = {
  handleChangeFilter: (filter: "angular" | "react" | "vue") => void;
};

const DropDownMenu: React.FC<Props> = ({ handleChangeFilter }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dropdownmenu">
      <button onClick={() => setMenuOpen(!menuOpen)}>
        Select your news <FaAngleDown />
      </button>
      {menuOpen && (
        <div className="menu">
          <ul>
            <li onClick={() => handleChangeFilter("angular")}>
              <img src={angularlogo} alt="angular-logo" /> Angular
            </li>
            <li onClick={() => handleChangeFilter("react")}>
              <img src={reactlogo} alt="react-logo" /> React
            </li>
            <li onClick={() => handleChangeFilter("vue")}>
              <img src={vuelogo} alt="vue-logo" /> Vuejs
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
