import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {CursorContext} from "../../../../../../Providers/CursorContextProvider";
import styles from './QubitCell.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addDroppedGate, updateDroppedGate, updateQubit} from "../../../../../../../redux/actions/circuitConfigAction";
import {Gate, GateExtension, Qubit} from "../../../../../../../common/classes";
import {RootState} from "../../../../../../../redux/reducers/rootReducer";
import {GateExtTypes, GateTypes} from "../../../../../../../common/types";
import {DIMENSIONS} from "../../../../../../../common/constants";
import {calculateQubitGap, calculateQubitSpan} from "../../../../../../../utils/formula";

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
    const cellRef = useRef(null);
    const {
        selectedGate,
        selectedCompoundGate

    } = useSelector((state : RootState) => (state.circuitConfig));
    const dispatch = useDispatch();

    const handleMouseDown = (event : any) => {
        if (!cursor.attached) {
            return;
        }

        setHasGate(true);
        const qubitIds = [];
        qubitIds.push(props.qubitId);

        let renderHeight = DIMENSIONS.STD_GATE.HEIGHT;
        let renderWidth = DIMENSIONS.STD_GATE.WIDTH;
        let renderX = props.cellXPos;
        let renderY = props.cellYPos;
        let newGateExtType : GateExtTypes;
        let CGateDroppedFromMenu : boolean;
        let rotAngle : string | null;

        if (selectedGate === 'CNOT') {
            newGateExtType = 'CNOT_TARGET';
            CGateDroppedFromMenu = true;
            rotAngle = null;

            removeAttachment();
        }
        else if (selectedGate.toString().includes('R')) {
            newGateExtType = 'None';
            CGateDroppedFromMenu = true;
            rotAngle = 'pi/2';
        }

        else if (selectedGate === 'Measurement Gate') {
            let newQubit = new Qubit(props.colIndex);
            newQubit.id = props.qubitId;
            newQubit.y = props.cellYPos;
            newQubit.size = props.colIndex;
            dispatch(updateQubit(props.qubitId, 'qubitCells', newQubit.qubitCells));
            newGateExtType = 'None';
            CGateDroppedFromMenu = true;
            rotAngle = 'null';
        }
        else if (selectedGate === 'Compound Gate') {
            renderWidth = selectedCompoundGate.width;
            const qubitGap = calculateQubitGap(DIMENSIONS.GRID.HEIGHT, DIMENSIONS.STD_GATE.HEIGHT);
            const qubitSpan = calculateQubitSpan(selectedCompoundGate.height, qubitGap, DIMENSIONS.STD_GATE.HEIGHT);
            renderHeight = selectedCompoundGate.height;
            renderY = props.cellYPos - Math.floor(qubitSpan / 2) * DIMENSIONS.GRID.HEIGHT;
            console.log(`Cell Y POS : ${props.cellYPos}`)
            newGateExtType = 'None';
            CGateDroppedFromMenu = true;
            rotAngle = null;
        }
        else {
            newGateExtType = 'None';
            CGateDroppedFromMenu = true;
            rotAngle = null;
        }

        const newGateExt = new GateExtension(
            props.cellYPos + DIMENSIONS.STD_GATE.HEIGHT/2 ,"", newGateExtType);
        const gateToAdd = new Gate(
            renderX,
            renderY,
            renderWidth,
            renderHeight,
            qubitIds,
            selectedGate as GateTypes,
            newGateExt,
            CGateDroppedFromMenu,
            rotAngle,
            selectedCompoundGate.name,
            selectedCompoundGate.includedGates);
        dispatch(addDroppedGate(gateToAdd));

    }
    const removeAttachment = useCallback(() => {
            setCursor((cursorContextStates) => ({attached: false}));
    },[]);

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
