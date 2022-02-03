import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {CursorContext} from "../../../../../Providers/CursorContextProvider";
import styles from './QubitCell.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addDroppedGate} from "../../../../../../redux/actions/circuitConfigAction";
import {Gate} from "../../../../../../common/classes";
import {RootState} from "../../../../../../redux/reducers/rootReducer";
import {GateType} from "../../../../../../common/types";

interface GridCellProps {
    rowIndex : number;
    colIndex : number;
    cellXPos : number;
    cellYPos : number;
    hasGate : boolean;
}

const QubitCell : React.FC <GridCellProps> = (props) => {
    const [hovered, setHovered] = useState(false);
    const {cursor ,setCursor } = useContext(CursorContext);
    const [hasGate, setHasGate] = useState(props.hasGate);
    const cellRef : any = useRef(null);
    const {selectedStandardGate} = useSelector((state : RootState) => (state.circuitConfig));
    const dispatch = useDispatch();

    const handleMouseDown = (event : any) => {
        if (!cursor.attached) {
            // console.log("cursor not attached!");
            return;
        }

        setHasGate(true);

        const gateToAdd = new Gate(props.cellXPos, props.cellYPos,
            40, 38,
            props.rowIndex, props.colIndex, selectedStandardGate as GateType);
        dispatch(addDroppedGate(gateToAdd))
        removeAttachment();

    }
    const removeAttachment = useCallback(() => {
        setCursor(({attached}) => ({attached: false}));
    },[])

    const handleMouseUp = () => {
        if (cursor.attached) {
            // console.log("cursor is attached!");
            return;
        }
    }

    const handleMouseEnter = () => {
        setHovered(true);
    }

    const handleMouseLeave = () => {
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
        <g className={styles.qubitCell}>
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

export default QubitCell;
