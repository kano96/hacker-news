import React from "react";
import logo from "../../assets/hacker-news@3x.png";

const Nav: React.FC = () => {
  return (
    <div className="navBar">
      <img src={logo} alt="logo-hacker-news" />
    </div>
  );
};

export default Nav;
