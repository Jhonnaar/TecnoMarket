import React, { useState, useEffect } from "react"
import Home from "./pages/home.js"
import Login from "./pages/Login.js";
import Register from "./pages/register.js";
import Articles from "./pages/articles.js";
import Cart from "./pages/cart.js";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
            <Routes>
            <Route exact path="/" element={<Home/>}>
            </Route>
            <Route exact path="/login" element={<Login/>}>
            </Route>
            <Route exact path="/Register" element={<Register/>}>
            </Route>
            <Route exact path="/articles" element={<Articles/>}>
            </Route>
            <Route exact path="/cart" element={<Cart/>}>
            </Route>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
