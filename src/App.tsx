import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CircuitBuilder from './components/CircuitBuilder/CircuitBuilder';
import About from './components/About/About';
import Setup from './components/Setup/Setup';
import CircuitOutput from './components/CircuitOutput/CircuitOutput';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { Modal } from './components/Modal/Modal';
import Footer from './components/Footer/Footer';
import LoginOrCreateAccount from "./components/LoginOrCreateAccount/LoginOrCreateAccount";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <nav>
                <Header/>
            </nav>
            <Routes>
                <Route path="/about" element={<About/>}/>
                <Route path="/setup" element={<Setup/>}/>
                <Route path="/circuit-builder" element={<CircuitBuilder/>}/>
                <Route path="/circuit-output" element={<CircuitOutput/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/login-or-create-account" element={<LoginOrCreateAccount/>} />
            </Routes>
        </BrowserRouter>
        <Modal/>
        <Footer/>
    </div>
  );
}

export default App;
