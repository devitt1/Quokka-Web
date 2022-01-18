import React from 'react';
import styles from './CircuitBuilder.module.scss';

const Grid : React.FC = () => {

    const handleOnClick = (event : any) => {
        console.log(`event.ClientX : ${event.clientX} event.ClientY: ${event.clientY}`);
        // var pos = getGridPosition(event);
        // createRectAt(pos);
    }

    return (<svg width="100%" height="100%" >
        <pattern id="pattern-checkers" x="0" y="0" width="48" height="39" patternUnits="userSpaceOnUse">
            <rect className={styles.gridCell} x="0" width="40" height="38" y="0"
            />
            <rect className={styles.gridCell} x="100" width="8" height="40" y="100"
            />
        </pattern>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-checkers)" onClick={handleOnClick}/>
    </svg>);
}

export default Grid;
