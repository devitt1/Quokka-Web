import { Draggable } from './Draggable';
import styles from './CircuitBuilder.module.scss';


interface GateProps {
    key : string
    gateObject : any,
    onDragStart : any,
    onDragEnd : any,
    children : any
}

export const Gate : React.FC<GateProps> = (props: GateProps) => {
    const {key, gateObject, onDragStart, onDragEnd, children} = props;

    return (
        <Draggable
            key={key}
            dragObject={gateObject}
            onDragStart={(dragData : any) => onDragStart(dragData)}
            onDragEnd={() => onDragEnd()}
        >
            {children}
        </Draggable>
    );
}
