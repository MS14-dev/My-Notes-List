import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//import page components
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import UserInfoPage from "./pages/UserInfoPage";
import NewNotePage from "./pages/NewNotePage";
import StudentPage from "./pages/StudentPage";
import NotePage from "./pages/NotePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import SearchListPage from "./pages/SearchListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<HomePage/>} />
        <Route path="/signin"  element={<SigninPage/>} />
        <Route path="/student-info"  element={<UserInfoPage/>} />
        <Route path="/new-note"  element={<NewNotePage/>} />
        <Route path="/my-account" element={<StudentPage/>} />
        {/* this route is dynamic because content is dynamic according to the note */}
        <Route path="/note/:id" element={<NotePage/>} />
        <Route path="/admin/login" element={<AdminLoginPage/>} />
        <Route path="/admin/dashboard" element={<AdminPage/>} />
        <Route path="/admin/search" element={<SearchListPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
