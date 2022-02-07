import React from 'react';
import styles from './DroppedGates.module.scss';
import {GateTypes} from "../../../../common/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers/rootReducer";
import DroppedGate from "./DroppedGate/DroppedGate";

interface DroppedGatesProps {

}

const DroppedGates : React.FC<DroppedGatesProps> = () => {

    const {droppedGates} = useSelector((state : RootState) => (state.circuitConfig));


    return (<g className={styles.droppedGates}>
        {
            droppedGates.map((gate) => {
                return <DroppedGate key={gate.id} id={gate.id} x={gate.x} y={gate.y} rowIndex={gate.rowIndex}
                                    colIndex={gate.colIndex} qubitIds={gate.qubitIds}width={40} height={38}
                                    type={gate.type as GateTypes}/>
            })
        }


    </g>)
}

export default DroppedGates;
