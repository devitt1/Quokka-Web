import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg'

const Header : React.VFC  = () => {


    return (<div className={styles.header}>
        <div className={styles.logo}>
            <img alt="Quokka" src={logo}/>
            <h1>Quokka</h1>
        </div>
        {/*<Link to="" className={styles.logo}>*/}
        {/*    <img alt="Quokka" src={logo}/>*/}
        {/*</Link>*/}


    </div>)
}


export default Header;
