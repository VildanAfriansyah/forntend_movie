import React from "react";
import { Link } from "react-router-dom";

import "../assets/css/header.css";

function Header() {
  return (
    <nav className="sticky">
      <div>Logo</div>
      <div>
        <ul>
          <li>
            <Link to="/my-movie">My Movie</Link>
          </li>
          <li>
            <Link to="#">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
