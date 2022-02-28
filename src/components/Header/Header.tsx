import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg'
import { RootState } from '../../redux/reducers/rootReducer';

import {useSelector } from 'react-redux';
import account_icon from '../../assets/account_icon.svg';
import arrow_down_black from '../../assets/arrow_down_black.svg';
import {ROUTES} from "../../common/constants";
import {Button} from "../Button/Button";
import DropdownButton from "../DropdownButton/DropdownButton";
import {Dropdown} from "../Dropdown/Dropdown";
import DropdownList from "../Dropdown/DropdownList/DropdownList";

const Header : React.VFC  = () => {
    const deviceConn = useSelector((state: RootState) => state.deviceConnection);
    const [accountMenuClicked, setAccountMenuClicked] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    var connDotStyle = styles.connectionDot;
    var statusStyle = styles.status;

    if (deviceConn.connected){
        connDotStyle = styles.connectionDot + ' ' + styles.connected;
        statusStyle = styles.statusInfo + ' ' + styles.connected;
    }

    const handleAccountMenuClicked = () => {
        setAccountMenuClicked(!accountMenuClicked);
    }

    const handleAccountMenuItemClicked = () => {
        setAccountMenuClicked(!accountMenuClicked);
    }

    const renderAccountMenuButton = () => {
        return <div className={styles.accountMenuDropdown}>

            <DropdownButton name={'Account'} buttonTypes={['accountMenuBtn']} leftImageSource={account_icon}
                            rightImageSource={arrow_down_black}>
                    <Dropdown type={'accountMenuDropdown'}>
                        <div> Welcome <br/>email@address.com</div>
                        <DropdownList type={'accountMenuDropdown'} list={['Saved Files', 'Connect to a \n Quokka device', 'Update password', 'Logout']}
                                      onDropdownItemClicked={handleAccountMenuItemClicked}/>
                    </Dropdown>
                </DropdownButton>
            </div>
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


                {
                    !loggedIn ?
                        <div className={styles.loginNavLink}>
                            <img src={account_icon} />
                            <NavLink to="/login" className={(navData) => styles.loginLbl}>Login/Create Account</NavLink>

                        </div>
                        :
                    renderAccountMenuButton()
                }
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
