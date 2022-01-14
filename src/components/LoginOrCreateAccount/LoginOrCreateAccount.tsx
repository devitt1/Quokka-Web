import React from 'react';
import styles from './LoginOrCreateAccount.module.scss';
import {NavLink} from "react-router-dom";
import logo from '../../assets/logo.svg'
import underlay_quokka_icon from '../../assets/underlay_quokka_icon.svg';
const LoginOrCreateAccount : React.FC = () => {
    return (
        <div className={styles.container}>
            <img src={underlay_quokka_icon}/>
            <hr className={styles.divider}/>
            <div className={styles.loginOrCreateAccount}>
                <div className={styles.login}>
                    <h2>Login to Quokka</h2>
                    <input placeholder="Email Address" className={styles.emailInput} />
                    <input placeholder="Password" className={styles.passwordInput}/>
                    <button className={styles.loginBtn}>Login</button>
                    <button className={styles.forgotBtn}>Forgot Password?</button>

                </div>
                <div className={styles.createAccount}>
                    <h2>Create account</h2>
                    <p>
                        Creating an account allows you to access <br/>
                        the full functionality of the Quokka <br/>
                        interface including the ability to save <br/>
                        circuits and compound gates.
                    </p>
                    <input  placeholder="Email Address" className={styles.emailInput}/>
                    <input  placeholder="Create Password" className={styles.passwordInput}/>
                    <input placeholder="Confirm Password" className={styles.confirmPasswordInput}/>
                    <button className={styles.loginBtn}>Login</button>
                </div>
        </div>
    </div>)
}


export default LoginOrCreateAccount;
