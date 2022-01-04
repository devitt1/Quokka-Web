import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg'

const Header : React.VFC  = () => {
    // const location = useLocation();

    return (<div className={styles.header}>
        <div className={styles.logo}>
            <img alt="Quokka" src={logo}/>
            <h1>Quokka</h1>
        </div>


        <div className={styles.menu}>
            <div className={styles.status} >
                <p>Quokka Status: </p>
                <p>Not connected</p>
            </div>

            <div className={styles.loginMenu}>
                <p>Login/Create Account</p>
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
