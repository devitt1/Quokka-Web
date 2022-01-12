import React, { useState } from 'react';
import styles from './CircuitBuilder.module.scss';
import { SVGArea } from './SVGArea';
import { SVGGrid } from './SVGGrid';
import { Qubit } from './Qubit';

interface CircuitArrangementProps {
    qubits : {id : string, number : number }[],
    draggedData : any
}

const CircuitArrangement : React.FC<CircuitArrangementProps> = (props) => {


    return (<div className={styles.circuitArrangement}>
            {/*<SVGArea draggedData={props.draggedData}/>*/}
            {/*<ul>*/}
            {/*    {props.qubits.map((qubit) => {*/}
            {/*            return (*/}
            {/*                <li><Qubit/></li>*/}
            {/*            );*/}
            {/*        }*/}
            {/*    )}*/}
            {/*</ul>*/}
            <SVGGrid/>


        </div>
    )
}


export default CircuitArrangement;
