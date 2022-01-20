import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    name : string;
    buttonStyle : string;
    onClick : any;
    selected : boolean
}

export const Button : React.FC<ButtonProps> = (props) => {
    var buttonStyle = styles.button;
    if (props.buttonStyle === "selectGateBtn") {
        buttonStyle += ' ' + styles.selectGateBtn;
        if (props.selected) {
            buttonStyle += ' ' + styles.selected;
        }
    } else if (props.buttonStyle === "runCircuitBtn") {
        buttonStyle = styles.button + ' ' + styles.runCircuitBtn;
    }

    return (<div className={styles.button}>
        <button className={buttonStyle} onClick={props.onClick}>
            {props.name}
        </button>

    </div>)
}
