import React, { useState } from "react";
import "./header.css";
import Nav from "../nav/nav";

const Header = () => {
  return (
    <header className="headerContainer">
      <img src="logo.png" alt="logo" className="logoImage" />
      <Nav />
    </header>
  );
};

export default Header;
