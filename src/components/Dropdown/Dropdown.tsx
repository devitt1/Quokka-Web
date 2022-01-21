import React, {useState} from 'react';
import styles from './Dropdown.module.scss';
import arrow_down_black from '../../assets/arrow_down_black.svg';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {updateSelectedStandardGate} from "../../redux/actions/circuitConfigAction";
interface DropdownProps {
    name : string;
    borderStyle: string;
    dropdownContent: string[];
}


export const Dropdown : React.FC<DropdownProps> = (props) => {
    const dispatch = useDispatch();

    var dropDownBtnStyle = styles.dropdown;
    const [toggleDropdown, setToggleDropdown] = useState(false);
    if (props.borderStyle === "roundedRightCorner"){
        dropDownBtnStyle = styles.roundedRightCorner;
    }

    if (toggleDropdown) {
        dropDownBtnStyle += ' ' + styles.selected;
    }

    const handleDropdownClicked = () => {
        console.log("dropdown clicked");
        setToggleDropdown(!toggleDropdown);

    }

    const handleDropdownItemClicked = (dropdownItem : string) => {
        console.log(`dropdown item clicked ${dropdownItem}`);

        dispatch(updateSelectedStandardGate(dropdownItem));
    }

    return <div className={styles.dropdown}>
        <button className={dropDownBtnStyle} onClick={handleDropdownClicked}>
            {props.name}
            <img src={arrow_down_black}/>
        </button>

        {toggleDropdown
        ?
            <div className={styles.dropdownList}>
                {
                    props.dropdownContent.map((dropdownItem) =>
                        (<div className={styles.dropdownItem} onClick={() => handleDropdownItemClicked(dropdownItem)}>
                            <p>{dropdownItem}</p>
                        </div>)
                    )
                }
            </div>
            :
            null

        }


    </div>
}
