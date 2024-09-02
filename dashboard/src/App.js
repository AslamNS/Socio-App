import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Post from "./Components/Post";
import Login from "./Components/Login";
import Users from "./Components/Users";
import Profile from "./Components/Profile";
import Community from "./Components/Community";
import Reports from "./Components/Reports";

function App() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  return (
    <>
      <BrowserRouter>
        {auth == null ? (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </>
        ) : auth.usertype == 1 ? (
          <>
            <Routes>
              <Route path="/reports" element={<Home />} />
              <Route path="/post" element={<Post />} />
              <Route path="/" element={<Users />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/community" element={<Community />} />
              <Route path="/communityreports" element={<Reports />} />
            </Routes>
          </>
        ) : (
          ""
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
