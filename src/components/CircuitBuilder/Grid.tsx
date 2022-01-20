import React, {useRef} from 'react';
import styles from './CircuitBuilder.module.scss';
import GridRow from "./GridRow";

const Grid : React.FC = () => {
    const gridRef = useRef(null);

    return (<svg className={styles.grid} width="100%" height="100%" >
        <pattern id="pattern-checkers" x="0" y="0" width="48" height="39" patternUnits="userSpaceOnUse">
            <rect  x="0" width="40" height="38" y="0" fill="#B5C2D7"
                  opacity="0"
            />
            <rect  x="100" width="8" height="40" y="100"
            />
        </pattern>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-checkers)"/>
        <GridRow rowVerticalOffset={39}/>
        <GridRow rowVerticalOffset={117}/>
        <GridRow rowVerticalOffset={195}/>

    </svg>);
}

export default Grid;
