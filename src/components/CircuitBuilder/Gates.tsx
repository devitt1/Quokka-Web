import React from 'react';
import styles from './CircuitBuilder.module.scss';
import { Draggable } from './Draggable';
import { Gate } from './Gate';

const gates = [
    { name: "X", color: "blue" },
    { name: "Y", color: "pink" },
    { name: "Z", color: "green" },
];

interface GatesProps {
    setDragData : any
}

export const Gates : React.FC<GatesProps> = (props) : JSX.Element => {
    const onDragStart = (dragData : any) => {
        props.setDragData(dragData);
    };

    const onDragEnd = () => {};

    return (
        <div className={styles.toolbox}>
            {gates.map((gate) => (
                <Gate
                    key={gate.name}
                    gateObject={gate}
                    onDragStart={(dragData : any) => onDragStart(dragData)}
                    onDragEnd={() => onDragEnd()}>
                    <div className={styles.gate} style={{ backgroundColor: gate.color }}>
                        {gate.name}
                    </div>
                </Gate>
            ))}
        </div>
    )
}
