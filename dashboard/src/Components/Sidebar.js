import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="sidebar pe-4 pb-3">
        <nav
          className="navbar bg-secondary navbar-dark"
          style={{ height: "100%" }}
        >
          <div className="d-flex align-items-center ms-4 mb-4"></div>
          <div className="navbar-nav w-100" style={{ marginTop: "-650px" }}>
            <Link to="/" className="nav-item nav-link ">
              Home
            </Link>
            <Link to="/reports" className="nav-item nav-link ">
              Reported Posted
            </Link>
            <Link to="/community" className="nav-item nav-link ">
              Communities
            </Link>
            <Link to="/communityreports" className="nav-item nav-link ">
              Reported Contents
            </Link>
          </div>
        </nav>
      </div>
      <Header />
    </>
  );
}

export default Sidebar;
