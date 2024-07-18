
import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";

function App(){
  return (
    <Router>
    <Routes>
      <Route path='/login' exact element={<Login />} />
      <Route path='/register' exact element={<Register />} />
      <Route path='/' exact element={<Chat/>}/>
    </Routes>
  </Router>
  );
};

export default App;

