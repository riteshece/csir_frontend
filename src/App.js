import React from "react";
import Login from "./Components/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/auth/Signup";
import Section1 from "./Components/Section1";
import Section6 from "./Components/Section6";
import Section2 from "./Components/Section2";
import Section3 from "./Components/Section3";
import Section4 from "./Components/Section4";
import ChangePassword from "./Components/auth/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="section1" element={<Section1 />}></Route>
          <Route path="section6" element={<Section6 />}></Route>
          <Route path="Section2" element={<Section2 />}></Route>
          <Route path="Section3" element={<Section3 />}></Route>
          <Route path="Section4" element={<Section4 />}></Route>
          <Route path="changePassword" element={<ChangePassword />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
