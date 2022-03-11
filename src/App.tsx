import React, {useEffect} from 'react';
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
import ModalContainer from "./components/ModalContainer/ModalContainer";
import BuildOutputView from "./components/CircuitOutput/BuildOutputView/BuildOutputView";
import {ROUTES} from "./common/constants";
import SavedFiles from "./components/SavedFiles/SavedFiles";
import CompoundGateSelectionContextProvider from "./components/Providers/CompoundGateSelectionContextProvider";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import APIClient from "./api/APIClient";
import {IUser} from "./common/interfaces";
import {useDispatch, useSelector} from "react-redux";
import {updateCurrentlyAuthenticatedUser, updateUserAuthentication} from "./redux/actions/authAction";
import {RootState} from "./redux/reducers/rootReducer";


function App() {
    const apiClient = new APIClient();
    const {authenticated} = useSelector((state: RootState) => (state.auth));
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            console.log("app refreshed")
            try {
                const response = await apiClient.authService.getMe();
                if (response) {
                    dispatch(updateUserAuthentication(true));
                    dispatch(updateCurrentlyAuthenticatedUser({id: response.data.id, email: response.data.email}));
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
  return (
    <div className={styles.App}>
            <CompoundGateSelectionContextProvider>
                <BrowserRouter>
                    <nav>
                        <Header/>
                    </nav>
                    <Routes>
                        <Route path={ROUTES.ABOUT} element={
                            <About/>
                        }/>
                        <Route path={ROUTES.SETUP} element={
                            <Setup/>
                        }/>
                        <Route path={ROUTES.CIRCUIT_BUILDER} element={
                            <CircuitBuilder/>
                        }/>
                        <Route path={ROUTES.CIRCUIT_OUTPUT} element=
                            {
                            <CircuitOutput/>
                            }
                        />
                        <Route path={ROUTES.SAVED_FILES} element={
                            <SavedFiles/>
                        }/>
                        <Route path={ROUTES.LOGIN} element={
                            <LoginOrCreateAccount/>
                        } />
                        <Route path={`${ROUTES.CIRCUIT_OUTPUT}${ROUTES.BUILD_OUTPUT}/:buildId`} element={
                            <BuildOutputView/>}
                        />
                        <Route path={``} element={
                            <About/>
                        }/>
                        <Route path="*" element={
                            <PageNotFound/>
                        }/>
                    </Routes>
                </BrowserRouter>
                <ModalContainer/>
            </CompoundGateSelectionContextProvider>
        <Footer/>
    </div>
  );
}

export default App;
