import React, { useState } from "react";
import Link from "next/link"; // Use Link from next/link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo Section */}
      <div>
        <Link href="/">
          <a>
            <img
              src={logo}
              alt="Logo"
              width={50}
              height={50}
              className="w-12 h-12"
            />
          </a>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* Menu Items */}
      <ul
        className={`md:flex space-x-4 absolute md:static bg-white w-full md:w-auto top-full left-0 p-4 md:p-0 transition-transform transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } md:translate-y-0`}
      >
        <li>
          <Link href="/">
            <a className="hover:text-blue-700">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="hover:text-blue-700">About</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a className="hover:text-blue-700">Contact</a>
          </Link>
        </li>
        <li>
          <Link href="/mentorship">
            <a className="hover:text-blue-700">1:1 Mentorship</a>
          </Link>
        </li>
        <li className="flex space-x-4">
          <a href="#" aria-label="Instagram">
            <FontAwesomeIcon
              icon={faInstagram}
              size="lg"
              className="hover:text-gray-700"
            />
          </a>
          <a href="#" aria-label="Facebook">
            <FontAwesomeIcon
              icon={faFacebook}
              size="lg"
              className="hover:text-gray-700"
            />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FontAwesomeIcon
              icon={faLinkedin}
              size="lg"
              className="hover:text-gray-700"
            />
          </a>
        </li>
        <li>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900">
            Login/Signup
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
