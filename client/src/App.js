import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chats from "./Components/User/Chats";
import Post from "./Components/User/Post";
import Group from "./Components/User/Group";
import Groupchat from "./Components/User/Groupchat";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import EditPost from "./Components/User/Editpost";
import Community from "./Components/User/Community";
import Createcommunity from "./Components/User/Createcommunity";

function App() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  return (
    <BrowserRouter>
      {authenticated == null ? (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      ) : authenticated.usertype == 0 ? (
        <>
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="/chat" element={<Chats />} />
            <Route path="/group" element={<Group />} />
            <Route path="/community" element={<Community />} />
            <Route path="/createcommunity" element={<Createcommunity />} />
            <Route path="/groupchat" element={<Groupchat />} />
            <Route path="/editpost" element={<EditPost />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
