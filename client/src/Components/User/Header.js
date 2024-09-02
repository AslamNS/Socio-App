import React from "react";

function Header() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <div
        class="container-fluid shadow-sm position-relative z-3"
        style={{ backgroundColor: "#75b082" }}
      >
        <header class="-container-fluid d-flex justify-content-center py-3">
          <ul class="nav nav-pills w-100">
            <li class="nav-item p-1 bg-white rounded-pill me-auto">
              <a
                href="/"
                class="nav-link animated_text fw-bold"
                aria-current="page"
              >
                Socio App
              </a>
            </li>
            <li class="nav-item">
              <a href="/group" class="nav-link text-white fw-bold">
                Create Group
              </a>
            </li>
            <li class="nav-item">
              <a href="/createcommunity" class="nav-link text-white fw-bold">
                Create Community / Join
              </a>
            </li>
            <li class="nav-item">
              <a href="/chat" class="nav-link text-white fw-bold">
                Chat
              </a>
            </li>
            <li class="nav-item">
              <a href="/groupchat" class="nav-link text-white fw-bold">
                Group chat
              </a>
            </li>
            <li class="nav-item">
              <a href="/community" class="nav-link text-white fw-bold">
                Community chat
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#"
                onClick={handleLogout}
                class="nav-link text-white fw-bold"
              >
                <i class="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout
              </a>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
}

export default Header;
