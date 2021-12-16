import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

//styles
import "./DropDownMenu.css";

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
      <div onClick={() => setMenuOpen(!menuOpen)} className="selectButton">
        Select your news <FaAngleDown className="arrowDownIcon" />
        {menuOpen && (
          <div className="menu">
            <ul>
              <li
                onClick={() => {
                  handleChangeFilter("angular");
                  setMenuOpen(!menuOpen);
                }}
              >
                <img src={angularlogo} alt="angular-logo" /> Angular
              </li>
              <li
                onClick={() => {
                  handleChangeFilter("react");
                  setMenuOpen(!menuOpen);
                }}
              >
                <img src={reactlogo} alt="react-logo" /> React
              </li>
              <li
                onClick={() => {
                  handleChangeFilter("vue");
                  setMenuOpen(!menuOpen);
                }}
              >
                <img src={vuelogo} alt="vue-logo" /> Vuejs
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownMenu;
