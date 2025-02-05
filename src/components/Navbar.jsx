import React, { useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} w-full flex 
      items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Pritam &nbsp;
            <span className="sm:block hidden">Kumar</span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              {link.id === "resume" ? (
                <a
                  href={link.link} // Resume link from constants.js
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition duration-300"
                >
                  {link.title}
                </a>
              ) : (
                <a
                  href={`#${link.id}`}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer`}
                  onClick={() => setActive(link.title)}
                >
                  {link.title}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  {link.id === "resume" ? (
                    <a
                      href={link.link} // Resume link from constants.js
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <a
                      href={`#${link.id}`}
                      className={`${
                        active === link.title ? "text-white" : "text-secondary"
                      } font-poppins font-medium cursor-pointer text-[16px]`}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(link.title);
                      }}
                    >
                      {link.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
