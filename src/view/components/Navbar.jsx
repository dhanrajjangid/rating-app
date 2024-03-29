import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar px-3 shadow-sm navbar-light bg-light justify-content-between">
        <Link className="navbar-brand px-3">Navbar</Link>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Sign In
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
