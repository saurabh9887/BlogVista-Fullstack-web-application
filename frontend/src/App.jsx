import React, { useContext } from "react";
import Topbar from "../src/components/topbar/Topbar.jsx";
import Home from "../src/pages/Home/Home.jsx";
import Login from "../src/pages/login/Login.jsx";
import Register from "../src/pages/register/Register.jsx";
import Settings from "../src/pages/settings/Settings.jsx";
import Single from "../src/pages/single/Single.jsx";
import Write from "../src/pages/write/Write.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./Context/Context.jsx";

const App = () => {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/post/:id" element={user ? <Single /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/setting" element={user ? <Settings /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
