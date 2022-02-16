import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {CursorContext} from "../../../../../Providers/CursorContextProvider";
import styles from './QubitCell.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addDroppedGate, updateDroppedGate} from "../../../../../../redux/actions/circuitConfigAction";
import {Gate, GateExtension} from "../../../../../../common/classes";
import {RootState} from "../../../../../../redux/reducers/rootReducer";
import {GateTypes} from "../../../../../../common/types";
import {DIMENSIONS} from "../../../../../../common/constants";

interface QubitCellProps {
    qubitId : string;
    rowIndex : number;
    colIndex : number;
    cellXPos : number;
    cellYPos : number;
    hasGate : boolean;
}

const QubitCell : React.FC <QubitCellProps> = (props) => {
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
        const qubitIds = [];
        qubitIds.push(props.qubitId);
        const newGateExt = new GateExtension(props.cellXPos + 5, props.cellYPos, 48, 28,
            props.cellYPos + DIMENSIONS.STD_GATE.HEIGHT/2 + 5 ,"",'CNOT_TARGET');
        const gateToAdd = new Gate(props.cellXPos, props.cellYPos,
            40, 38, qubitIds, selectedStandardGate as GateTypes, 'pi/2', newGateExt, true);
        dispatch(addDroppedGate(gateToAdd));
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
