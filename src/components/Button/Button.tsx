import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    name : string;
    buttonStyle : string;
}

export const Button : React.FC<ButtonProps> = (props) => {
    var buttonStyle = styles.button;
    if (props.buttonStyle === "selectGateBtn") {
        buttonStyle = styles.button + ' ' + styles.selectGateBtn;
    } else if (props.buttonStyle === "runCircuitBtn") {
        buttonStyle = styles.button + ' ' + styles.runCircuitBtn;
    }

    return (<div className={styles.button}>
        <button className={buttonStyle}>
            {props.name}
        </button>

    </div>)
}
