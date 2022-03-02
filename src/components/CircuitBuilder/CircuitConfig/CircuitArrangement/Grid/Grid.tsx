import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styles from './Grid.module.scss';
import Qubit from "./Qubit/Qubit";
import DraggingGate from "../../../Gate/DraggingGate/DraggingGate";
import DroppedGates from "../../../Gate/DroppedGates/DroppedGates";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../redux/reducers/rootReducer";
import AddQubitActionBtn from "./Qubit/AddQubitActionBtn";
import {
    addQubit,
    removeDroppedGate,
    removeQubit,
    updateSelectedQubit
} from "../../../../../redux/actions/circuitConfigAction";
import {DIMENSIONS} from "../../../../../common/constants";
import {findFurthestTopLeftGateInArray, locateGatesInSelectionBox} from "../../../../../common/helpers";
import {
    CompoundGateSelectionContext,
    SelectionBoxState
} from "../../../../Providers/CompoundGateSelectionContextProvider";

const getElOffset = (el: any) => {
    const rect = el.getBoundingClientRect();

    return {
        left: rect.x,
        top: rect.y
    };
};
const initialSelectionBox = {
    mouseStartPosition: {x: 0, y: 0},
    dimension: {width: 0, height: 0},
    offset: {left: 0, top: 0},
    isDrawing: false
}

const Grid : React.FC = () => {
    const {circuitState, circuitConfigMode, selectedQubitId, selectedGateId} = useSelector((state : RootState) => (state.circuitConfig));
    const gridRef : any = useRef(null);
    const {selectionBox, setSelectionBox} = useContext(CompoundGateSelectionContext);

    const [gridPosition, setGridPosition] = useState({
        x : 0,
        y : 168
    })
    const dispatch = useDispatch();

    const handleAddQubitActionBtnClicked = () => {
        dispatch(addQubit());
    }

    const handleQubitSelected = (qubitId : string) => {
        if (selectedQubitId === qubitId) {
            dispatch(updateSelectedQubit(""));
        } // unselect if already selected
        else {
            dispatch(updateSelectedQubit(qubitId));
        }
    }

    useEffect( () => {
        const handleQubitDeleted = async (event : any) => {
            if (event.keyCode === 46) //DELETE KEY
            {
                dispatch(removeQubit(selectedQubitId));
                circuitState.droppedGates.forEach((gate, index) => {
                    if (gate.qubitIds.includes(selectedQubitId)) {
                        dispatch(removeDroppedGate(gate.id));
                    }
                })
            }
        };
        window.addEventListener('keydown', handleQubitDeleted);
        return () => {
            window.removeEventListener('keydown', handleQubitDeleted);
        }
    }, [selectedQubitId]);

    useEffect( () => {
        const handleGateDeleted = async (event : any) => {
            if (event.keyCode === 46) //DELETE KEY
            {
                dispatch(removeDroppedGate(selectedGateId));
            }
        };
        window.addEventListener('keydown', handleGateDeleted);
        return () => {
            window.removeEventListener('keydown', handleGateDeleted);
        }
    }, [selectedGateId]);

    const showGridPattern = () => {
        return  (<>
            <pattern id="grid-pattern" x="0" y="0"
                     width={DIMENSIONS.GRID.WIDTH}
                     height={DIMENSIONS.GRID.HEIGHT}
                     patternUnits="userSpaceOnUse">
                <rect x="0" y={DIMENSIONS.GRID.PADDING.TOP}
                      width={DIMENSIONS.STD_GATE.WIDTH}
                      height={DIMENSIONS.STD_GATE.HEIGHT}
                      fill="#B5C2D7"
                      opacity="0.1"/>
                <rect x="0" y="0"
                      width={DIMENSIONS.GRID.WIDTH}
                      height={DIMENSIONS.GRID.HEIGHT}
                      stroke="#B5C2D7" fill="transparent"
                      opacity="1"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)"/>
        </>)
    }

    const handleMouseDown = (event: any) => {
        if (circuitConfigMode !== 'CompoundGateCreationMode') return;

        console.log('mouse down in grid');

        var offset = getElOffset(gridRef.current);
        console.log(`draw offset [left, top], [${offset.left}, ${offset.top}]`);

        const mouseStartPos = {x: event.clientX - offset.left, y: event.clientY - offset.top};

        setSelectionBox((selectionBoxState) => ({
            mouseStartPosition: {x: mouseStartPos.x, y: mouseStartPos.y},
            dimension: {width: 0, height: 0},
            offset: offset,
            isDrawing: true
        }));
    }



    const handleMouseMove = (event: any) => {
        if (!selectionBox.isDrawing) return;
        console.log('mouse move in grid while drawing selection box');
        var currMousePos = {x: event.clientX - selectionBox.offset.left, y: event.clientY - selectionBox.offset.top};
        var newDimesion = {width: currMousePos.x - selectionBox.mouseStartPosition.x, height: currMousePos.y - selectionBox.mouseStartPosition.y}

        if (newDimesion.width <= 0) {// drawing direction to the left
            newDimesion.width = Math.abs(newDimesion.width)
        } else {
            currMousePos.x = selectionBox.mouseStartPosition.x;
            setSelectionBox(prev => ({...prev, mouseStartPosition: {x: currMousePos.x, y: currMousePos.y}}));
        }

        if (newDimesion.height <= 0) {// drawing direction to the left
            newDimesion.height = Math.abs(newDimesion.height);
        } else {
            currMousePos.y = selectionBox.mouseStartPosition.y;
            setSelectionBox(prev => ({...prev, mouseStartPosition: {x: currMousePos.x, y: currMousePos.y}}));
        }

        setSelectionBox(prev => ({...prev, dimension: {width: newDimesion.width, height: newDimesion.height}}));
    }

    const handleMouseUp = (event: any) => {
        if (!selectionBox.isDrawing) return;
        console.log('mouse up in grid while drawing selection box');
        setSelectionBox(prev => ({...prev, isDrawing: false}));
        console.log('stopped drawing');


    }

    return (
        <svg className={styles.grid} ref={gridRef}
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}

        >
            {/*{showGridPattern()}*/}
        {
            circuitState.qubits.map((qubit, index) => {
                return <Qubit key={qubit.id} id={qubit.id}
                              rowVerticalOffset={DIMENSIONS.GRID.HEIGHT * index + DIMENSIONS.GRID.PADDING.TOP}
                              qubitCells={qubit.qubitCells}
                              onQubitSelected={handleQubitSelected}
                              rowIndex={index}/>
            })

        }
        <AddQubitActionBtn x={DIMENSIONS.ADD_QUBIT_BTN.X_OFFSET}
           y={circuitState.qubits.length * DIMENSIONS.GRID.HEIGHT
           + DIMENSIONS.ADD_QUBIT_BTN.Y_OFFSET + DIMENSIONS.GRID.PADDING.TOP }
           onClick={handleAddQubitActionBtnClicked}/>
        <DroppedGates/>

        <DraggingGate
            xOffset={gridPosition.x}
            yOffset={gridPosition.y} x={0} y={0} width={40} height={38}/>

        <rect className={styles.selectionBox}
              x={selectionBox.mouseStartPosition.x}
              y={selectionBox.mouseStartPosition.y}
              width={selectionBox.dimension.width} height={selectionBox.dimension.height}/>

    </svg>);
}

export default Grid;

