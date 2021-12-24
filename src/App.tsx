import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CircuitBuilder from './components/CircuitBuilder/CircuitBuilder';
import About from './components/About/About';
import Setup from './components/Setup/Setup';
import CircuitOutput from './components/CircuitOutput/CircuitOutput';

function App() {
  return (
    <div className="App">
        <Header  />

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div></div>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/setup" element={<Setup/>}/>
                <Route path="/circuit-builder" element={<CircuitBuilder/>}/>
                <Route path="/circuit-output" element={<CircuitOutput/>}/>
            </Routes>

        </BrowserRouter>

    </div>
  );
}

export default App;
