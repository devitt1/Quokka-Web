import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg'
import account_icon from '../../assets/account_icon.svg';

const Header : React.VFC  = () => {
    const [deviceConnectionStatus, setDeviceConnectionStatus] = useState(false);

    var connDotStyle = styles.connectionDot;
    // const location = useLocation();

    if (deviceConnectionStatus){
        connDotStyle = styles.connectionDot + ' ' + styles.connected
    }

    const handleStatusClicked = () => {
        console.log("handleStatusClicked");
    }

    useEffect(()=> {
        setDeviceConnectionStatus(false);
    }, [])
    return (<div className={styles.header}>
        <div className={styles.logo}>
            <img alt="Quokka" src={logo}/>
            <h1>Quokka</h1>
        </div>


        <div className={styles.menu}>
            <div className={styles.status} >
                <p className={styles.statusLbl}>Quokka Status:</p>
                <div className={connDotStyle}/>
                <button className={styles.info}
                    onClick={() => handleStatusClicked()}
                >Not connected</button>
            </div>

            <div className={styles.loginMenu}>
                <img alt="AccIcon" src={account_icon}/>
                <button className={styles.loginLbl}>Login/Create Account</button>
            </div>


            <div className={styles.navButtons}>
                <NavLink to="/about" className={(navData) => navData.isActive ? styles.selected : ""}>About</NavLink>
                <NavLink to="/setup" className={(navData) => navData.isActive ? styles.selected : ""}>Setup Quokka</NavLink>
                <NavLink to="/circuit-builder" className={(navData) => navData.isActive ? styles.selected : ""}>Circuit Builder</NavLink>
                <NavLink to="/circuit-output" className={(navData) => navData.isActive ? styles.selected : ""}>Circuit Output</NavLink>
            </div>


        </div>
    </div>)
}


export default Header;
