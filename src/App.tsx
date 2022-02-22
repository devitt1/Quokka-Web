import React from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CircuitBuilder from './components/CircuitBuilder/CircuitBuilder';
import About from './components/About/About';
import Setup from './components/Setup/Setup';
import CircuitOutput from './components/CircuitOutput/CircuitOutput';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';
import LoginOrCreateAccount from "./components/LoginOrCreateAccount/LoginOrCreateAccount";
import CursorContextProvider from "./components/Providers/CursorContextProvider";
import Cursor from "./components/Cursor/Cursor";
import ModalContainer from "./components/ModalContainer/ModalContainer";
import BuildOutputView from "./components/CircuitOutput/BuildOutputView/BuildOutputView";
import {ROUTES} from "./common/constants";
import SavedFiles from "./components/SavedFiles/SavedFiles";
function App() {
  return (
    <div className={styles.App}>
        <CursorContextProvider>
            <Cursor/>
            <BrowserRouter>
                <nav>
                    <Header/>
                </nav>
                <Routes>
                    <Route path={ROUTES.ABOUT} element={<About/>}/>
                    <Route path={ROUTES.SETUP} element={<Setup/>}/>
                    <Route path={ROUTES.CIRCUIT_BUILDER} element={<CircuitBuilder/>}/>
                    <Route path={ROUTES.CIRCUIT_OUTPUT} element={<CircuitOutput/>}/>
                    <Route path={ROUTES.SAVED_FILES} element={<SavedFiles/>}/>
                    <Route path={ROUTES.LOGIN} element={<LoginOrCreateAccount/>} />
                    <Route path={`${ROUTES.CIRCUIT_OUTPUT}${ROUTES.BUILD_OUTPUT}/:buildId`} element={<BuildOutputView/>}/>
                    <Route path={``} element={<About/>}/>
                    <Route path="*" element={<PageNotFound/>}/>

                </Routes>
            </BrowserRouter>
            <ModalContainer/>
            <Footer/>
        </CursorContextProvider>

    </div>
  );
}

export default App;
