import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//import page components
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import UserInfoPage from "./pages/UserInfoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<HomePage/>} />
        <Route path="/signin"  element={<SigninPage/>} />
        <Route path="/student-info"  element={<UserInfoPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
