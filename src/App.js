import React from 'react';
import { First , Menu , Admin} from './components';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
);
};
export default App;
