import React, {useCallback, useContext, useRef, useState} from 'react';
import {CursorContext} from "../Providers/CursorContextProvider";
import styles from './CircuitBuilder.module.scss';
import useMousePosition from "../hooks/useMousePosition";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";

interface GridCellProps {
    cellXPos : number;
    cellYPos : number;
    hasGate : boolean;
}

const GridCell : React.FC <GridCellProps> = (props) => {
    const [hovered, setHovered] = useState(false);
    const {cursor ,setCursor } = useContext(CursorContext);
    const [hasGate, setHasGate] = useState(props.hasGate);
    const cellRef : any = useRef(null);


    const [position, setPosition] = useState({
        x: props.cellXPos,
        y : props.cellYPos,
        coords : { x: props.cellXPos, y: props.cellYPos}
    });


    const handleMouseDown = (event : any) => {
        console.log("mouse down...");
        //
        if (!cursor.attached) {
            console.log("cursor not attached!");
            return;
        }

        setHasGate(true);
        removeAttachment();

    }
    const removeAttachment = useCallback(() => {
        setCursor(({attached}) => ({attached: false}));
    },[])

    const handleMouseUp = () => {
        console.log("mouse up");

        if (cursor.attached) {
            console.log("cursor is attached!");
            return;
        }
    }

    const handleMouseEnter = () => {
        console.log("Mouse entered...");
        setHovered(true);
    }

    const handleMouseLeave = () => {
        // console.log("Mouse left...");
        setHovered(false);
    }

    const getCellStyle = () => {
        if (hovered) {
            if (hasGate) {
                return styles.hasGate;
            }
            return styles.hover;
        } else if (!hovered) {
            if (hasGate) {
                return styles.hasGate;
            }
            return '';

        }
    }


    return (
        <g className={styles.gridCell}>
            <rect ref={cellRef} x={props.cellXPos} y={props.cellYPos} width="40" height="38"
                  className={getCellStyle()}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
            />

        </g>
    )
}

export default GridCell;
