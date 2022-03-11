import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg'
import { RootState } from '../../redux/reducers/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import account_icon from '../../assets/account_icon.svg';
import arrow_down_black from '../../assets/arrow_down_black.svg';
import {ROUTES} from "../../common/constants";
import DropdownButton from "../DropdownButton/DropdownButton";
import {Dropdown} from "../Dropdown/Dropdown";
import DropdownList from "../Dropdown/DropdownList/DropdownList";
import {updateCurrentlyAuthenticatedUser, updateUserAuthentication} from "../../redux/actions/authAction";
const Header : React.VFC  = () => {
    const deviceConn = useSelector((state: RootState) => state.deviceConnection);
    const {authenticated, user} = useSelector((state: RootState) => state.auth);
    const [accountMenuClicked, setAccountMenuClicked] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();
    var connDotStyle = styles.connectionDot;
    var statusStyle = styles.status;

    if (deviceConn.connected){
        connDotStyle = styles.connectionDot + ' ' + styles.connected;
        statusStyle = styles.statusInfo + ' ' + styles.connected;
    }

    const handleAccountMenuItemClicked = (dropdownItem : string) => {
        console.log(dropdownItem);
        switch (dropdownItem) {
            case 'Logout' :
                dispatch(updateUserAuthentication(false));
                dispatch(updateCurrentlyAuthenticatedUser(null));
                localStorage.clear();
                history('login');
                break;
            default:
                break;
        }
        setAccountMenuClicked(!accountMenuClicked);

    }

    const renderAccountMenuButton = () => {
        return <div className={styles.accountMenuDropdown}>

            <DropdownButton name={'Account'} buttonTypes={['accountMenuBtn']} leftImageSource={account_icon}
                            rightImageSource={arrow_down_black}>
                    <Dropdown type={'accountMenuDropdown'}>
                        <div> Welcome <br/>{user?.email}</div>
                        <DropdownList type={'accountMenuDropdown'}
                                      list={['Saved Files', 'Connect to a \n Quokka device', 'Update password', 'Logout']}
                                      onDropdownItemClicked={(dropdownItem : string) => handleAccountMenuItemClicked(dropdownItem)}/>
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
                    !authenticated ?
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
