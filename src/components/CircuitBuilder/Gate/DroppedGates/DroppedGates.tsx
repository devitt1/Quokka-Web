import React from 'react';
import styles from './DroppedGates.module.scss';
import {GateTypes} from "../../../../common/types";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers/rootReducer";
import DroppedGate from "./DroppedGate/DroppedGate";

interface DroppedGatesProps {

}

const DroppedGates : React.FC<DroppedGatesProps> = () => {

    const {droppedGates} = useSelector((state : RootState) => (state.circuitConfig.circuitState));


    return (<g className={styles.droppedGates}>
        {
            droppedGates.map((gate) => {
                return <DroppedGate key={gate.id} id={gate.id} x={gate.x} y={gate.y} qubitIds={gate.qubitIds}
                                    width={gate.width} height={gate.height}
                                    type={gate.type as GateTypes} gateExtension={gate.gateExtension}
                                    droppedFromMenu={gate.droppedFromMenu}
                                    rotAngle={gate.rotAngle}/>
            })
        }


    </g>)
}

export default DroppedGates;
