import React, {useCallback, useContext} from 'react';
import styles from './CircuitBuilder.module.scss';
import {CursorContext} from "../Providers/CursorContextProvider";
import GridCell from "./GridCell";

interface GridRowProps {
    rowVerticalOffset : number
}

const GridRow : React.FC<GridRowProps> = (props) => {
    const { cursor, setCursor } = useContext(CursorContext);
    const slots = Array.from(Array(34).keys());

    return (<svg className={styles.gridRow} y="39" width="100%" height="100%" >
            <line className={styles.line} x1="0" y1={props.rowVerticalOffset + 20} x2="100%"
            y2={props.rowVerticalOffset + 20}/>
            {
                slots.map((number) => {
                    const xPos = number * 48;
                    return (<GridCell cellXPos={xPos} cellYPos={props.rowVerticalOffset} hasRect={false}/>)

                })
            }

            {/*<GridCell cellXPos={0} cellYPos={0} hasRect={false}/>*/}
            {/*<GridCell cellXPos={96} cellYPos={0} hasRect={false}/>*/}
        </svg>
    )

}

export default GridRow;
