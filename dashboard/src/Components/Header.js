import React from "react";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userdata");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <nav class="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-3">
        <a href="index.html" class="navbar-brand d-flex d-lg-none me-4">
          <h2 class="text-primary mb-0">
            <i class="fa fa-user-edit"></i>
          </h2>
        </a>
        <h1> Dashboard</h1>
        <div class="navbar-nav align-items-center ms-auto">
          <button
            class="d-none d-lg-inline-flex text-white btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
