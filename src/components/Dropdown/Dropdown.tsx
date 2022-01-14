import React from 'react';
import styles from './Dropdown.module.scss';
import arrow_down_black from '../../assets/arrow_down_black.svg';

interface DropdownProps {
    name : string;
    borderStyle: string;
}


export const Dropdown : React.FC<DropdownProps> = (props) => {
    var dropDownBtnStyle = styles.dropdown;
    if (props.borderStyle === "roundedRightCorner"){
        dropDownBtnStyle = styles.roundedRightCorner;
    }

    return <div className={styles.dropdown}>
        <button className={dropDownBtnStyle}>
            {props.name}
            <img src={arrow_down_black}/>
        </button>

    </div>
}
