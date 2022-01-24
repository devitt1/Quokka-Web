import React from 'react';
import styles from './DroppedGates.module.scss';
import Gate from "../Gate";
import {GateType} from "../../../common/types";
import circuitConfigReducer from "../../../redux/reducers/circuitConfigReducer";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";

interface DroppedGatesProps {

}

const DroppedGates : React.FC<DroppedGatesProps> = () => {

    const {droppedGates} = useSelector((state : RootState) => (state.circuitConfig));


    const gates = [
        {
            x: 48, y: 0, width:40, height:38, type: 'Y'
        },
        {
            x: 96, y:39, width: 40, height: 38, type: 'Z'
        },


    ];

    return (<g className={styles.droppedGate}>

        {
            droppedGates.map((gate) => {
                return <Gate x={gate.x} y={gate.y} width={40} height={38} type={gate.type as GateType}/>
            })
        }


    </g>)
}

export default DroppedGates;
