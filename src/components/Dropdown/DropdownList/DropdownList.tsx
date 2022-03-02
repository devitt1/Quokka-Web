import React from 'react';
import styles from './DropdownList.module.scss';
import {DropdownTypes} from "../../../common/types";
interface DropdownProps {
    list: string[];
    type?: DropdownTypes;
    onDropdownItemClicked : any;
}

const DropdownList : React.FC<DropdownProps> = (props) => {
    const {list, type, onDropdownItemClicked} = props;
    const dropdownListStyle = [styles.dropdownList];
    if (type === 'accountMenuDropdown') {
        dropdownListStyle.push(styles[type]);
    }
    const dropdownItemStyle = [styles.dropdownItem];

    return <div className={dropdownListStyle.join(' ')} >
        {
            list.map((dropdownItem, index) => {
                const dropdownItemStyle = [styles.dropdownItem];
                if (index === list.length-1) {
                    dropdownItemStyle.push(styles['lastItem'])
                }
                return (<div key={index}
                                 className={dropdownItemStyle.join(' ')} onClick={() => onDropdownItemClicked(dropdownItem)}>
                        <p>{dropdownItem}</p>
                    </div>)
                }
            )
        }
    </div>
}

export default DropdownList;
