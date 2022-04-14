import React from 'react';
import styles from './DropdownList.module.scss';
import {DropdownTypes} from "../../../common/types";
import DropdownItem from "./DropdownItem/DropdownItem";
interface DropdownProps {
    list: string[];
    type?: DropdownTypes;
    onDropdownItemClicked : any;
}

const DropdownList : React.FC<DropdownProps> = (props) => {
    const {list, type, onDropdownItemClicked} = props;
    const dropdownListStyle = [styles.dropdownList];
    if (type) {
        dropdownListStyle.push(styles[type]);
    }

    return <div className={dropdownListStyle.join(' ')} >
        {
            list.map((dropdownItem, index) => {
                return <DropdownItem key={index}
                                     label={dropdownItem}
                                     type={type}
                                     onClick={() => onDropdownItemClicked(dropdownItem)}
                                     isLastItem={index === list.length-1}>
                </DropdownItem>
                }
            )
        }
        {
            type === 'compoundGateDropdown' ?
                <DropdownItem label={'+ Create New'} onClick={() => onDropdownItemClicked('+ Create New')}/>
                : null
        }
    </div>
}

export default DropdownList;
