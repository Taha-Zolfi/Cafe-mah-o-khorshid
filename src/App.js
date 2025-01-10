import React from 'react';
import { First ,Second, Third ,Menu , Admin} from './components';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Firstpage = () => {
  return(
    <>
    <First/>
    <Second/>
    <Third/>
    </>
  )
}

const App = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
);
};
export default App;
