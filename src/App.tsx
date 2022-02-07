import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CircuitBuilder from './components/CircuitBuilder/CircuitBuilder';
import About from './components/About/About';
import Setup from './components/Setup/Setup';
import CircuitOutputs from './components/CircuitOutputs/CircuitOutputs';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { Modal } from './components/ModalContainer/Modal/Modal';
import Footer from './components/Footer/Footer';
import LoginOrCreateAccount from "./components/LoginOrCreateAccount/LoginOrCreateAccount";
import CursorContextProvider from "./components/Providers/CursorContextProvider";
import Cursor from "./components/Cursor/Cursor";
import ModalContainer from "./components/ModalContainer/ModalContainer";
function App() {
  return (
    <div className="App">
        <CursorContextProvider>
            <Cursor/>
            <BrowserRouter>
                <nav>
                    <Header/>
                </nav>
                <Routes>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/setup" element={<Setup/>}/>
                    <Route path="/circuit-builder" element={<CircuitBuilder/>}/>
                    <Route path="/circuit-output" element={<CircuitOutputs/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                    <Route path="/login-or-create-account" element={<LoginOrCreateAccount/>} />
                </Routes>
            </BrowserRouter>
            <ModalContainer/>
            <Footer/>
        </CursorContextProvider>

    </div>
  );
}

export default App;
