import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg'
import { RootState } from '../../redux/reducers/rootReducer';

import {useSelector } from 'react-redux';
import account_icon from '../../assets/account_icon.svg';
import {ROUTES} from "../../common/constants";

const Header : React.VFC  = () => {
    const deviceConn = useSelector((state: RootState) => state.deviceConnection);
    var connDotStyle = styles.connectionDot;
    var statusStyle = styles.status;

    if (deviceConn.connected){
        connDotStyle = styles.connectionDot + ' ' + styles.connected;
        statusStyle = styles.statusInfo + ' ' + styles.connected;
    }

    return (<div className={styles.header}>
        <div className={styles.logo}>
            <img alt="Quokka" src={logo}/>
            <h1>Quokka</h1>
        </div>


        <div className={styles.menu}>
            <div className={styles.status} >
                <p className={styles.statusLbl}>Quokka Status:</p>
                <div className={connDotStyle}/>
                <NavLink to="/setup" className={statusStyle}>
                    {
                        deviceConn.connected ?
                            `Connected to ${deviceConn.deviceName}` :
                            "Not connected"
                    }
                    </NavLink>
            </div>

            <div className={styles.accountMenu}>
                <img alt="AccIcon" src={account_icon}/>
                <NavLink to="/login" className={(navData) =>styles.loginLbl}>Login/Create Account</NavLink>
            </div>


            <div className={styles.navButtons}>
                <NavLink to={ROUTES.ABOUT} className={(navData) => navData.isActive ? styles.selected : ""}>About</NavLink>
                <NavLink to={ROUTES.SETUP} className={(navData) => navData.isActive ? styles.selected : ""}>Setup Quokka</NavLink>
                <NavLink to={ROUTES.CIRCUIT_BUILDER} className={(navData) => navData.isActive ? styles.selected : ""}>Circuit Builder</NavLink>
                <NavLink to={ROUTES.CIRCUIT_OUTPUT} className={(navData) => navData.isActive ? styles.selected : ""}>Circuit Output</NavLink>
            </div>


        </div>
    </div>)
}


export default Header;
