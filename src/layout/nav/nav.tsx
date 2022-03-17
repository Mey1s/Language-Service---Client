import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  const navChildren = [
    {
      title: "Language",
      to: "/",
      icon: <i className="fa fa-language" aria-hidden="true"></i>,
    },
    {
      title: "Coming soon",
      to: "/coming_soon",
      icon: <i className="fa fa-clock-o" aria-hidden="true"></i>,
    },
  ];
  return (
    <nav className="navApp">
      <ul className="listNavApp">
        {navChildren.map((navChild, i) => {
          return (
            <li key={i} className="itemListNavApp">
              <NavLink
                to={navChild.to}
                className={({ isActive }) =>
                  isActive
                    ? "activeLinkInItemListNavApp"
                    : "linkInItemListNavApp"
                }
              >
                {navChild.icon} {navChild.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
