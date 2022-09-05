import React from 'react';
import styles from './DroppedGates.module.scss';
import {GateTypes} from "../../../../common/types";
import DroppedGate from "./DroppedGate/DroppedGate";
import {IGate} from "../../../../common/interfaces";

interface DroppedGatesProps {
    droppedGates : IGate[]
    viewOnly? : boolean;
}

const DroppedGates : React.FC<DroppedGatesProps> = (props) => {

    const {droppedGates, viewOnly} = props;

    return (<g className={styles.droppedGates}>
        {
            droppedGates.map((gate) => {
                return <DroppedGate key={gate.id}
                                    id={gate.id}
                                    x={gate.x}
                                    y={gate.y}
                                    qubitIds={gate.qubitIds}
                                    width={gate.width}
                                    height={gate.height}
                                    type={gate.type as GateTypes}
                                    gateExtension={gate.gateExtension}
                                    droppedFromMenu={gate.droppedFromMenu}
                                    rotAngle={gate.rotAngle}
                                    name={gate.name}
                                    viewOnly={viewOnly}
                                    includedGates={gate.includedGates}
                />
            })
        }


    </g>)
}

export default DroppedGates;
