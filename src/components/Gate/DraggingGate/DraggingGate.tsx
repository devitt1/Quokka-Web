import React, {useEffect, useRef, useState} from 'react';
import styles from './DraggingGate.module.scss';
import Gate from "../Gate";

interface DraggingGateProps {
    x: number,
    y: number,
    width : number,
    height : number,
    type : 'X' | 'Y' | 'Z' | 'C'
}

const DraggingGate : React.FC<DraggingGateProps> = (children) => {
    const {x, y, width, height, type} = children;
    const draggingGateRef : any = useRef(null);

    const [position, setPosition] = useState({
        x: x,
        y: y,
        coords : { x: x, y: y}
    });

    useEffect(() => {

        setTimeout(() => {
            const draggingGateElem = draggingGateRef.current;
            console.log(draggingGateElem.getBoundingClientRect());

            setPosition(position => {
                const bClientRect = draggingGateElem.getBoundingClientRect();
                return {
                    x: position.x,
                    y: position.y,
                    coords: {
                        x: bClientRect.x,
                        y: bClientRect.y,
                    },
                };
            });

        }, 300);
    }, []);

    const handleMouseDown = (e : any) => {
        console.log(`Mouse down at dragging gate type ${type}`);
        document.addEventListener('mousemove', handleDraggableMouseMove.current);
        const draggingGateElem = draggingGateRef.current;
        console.log(draggingGateElem.getBBox());
        console.log(draggingGateElem.getBoundingClientRect());
        const bClientRect = draggingGateElem.getBoundingClientRect();
        const newX = e.clientX - bClientRect.x;
        const newY = e.clientY - bClientRect.y;

        console.log(`newX ${newX} newY ${newY}`);
    }

    const handleDraggableMouseMove = useRef((e : any) => {
        const draggingGateElem = draggingGateRef.current;
        console.log(draggingGateElem.getBBox());
        setPosition(position => {
            const newX = e.clientX - position.coords.x - width/2;
            const newY = e.clientY -  position.coords.y - height/2;

            console.log(`newX ${newX} newY ${newY}`);

            return {
                x: newX,
                y: newY,
                coords: {
                    x: position.coords.x,
                    y: position.coords.y,
                },
            };
        });
    });

    const handleDraggableMouseUp = (event : any) => {
        document.removeEventListener('mousemove', handleDraggableMouseMove.current);

        const draggingGateElem = draggingGateRef.current;
        const bBox = draggingGateElem.getBBox();

        const roundX = Math.floor(bBox.x / 48 ) * 48;
        const roundY = Math.floor(bBox.y / 39) * 39;
        console.log(`roundX ${roundX} roundY ${roundY}`);


        console.log("draggable mouse up");
        setPosition(position => {
            return {
                x: roundX,
                y: roundY,
                coords: {
                    x: position.coords.x,
                    y: position.coords.y,
                },
            };
        });


    }


    return <g ref={draggingGateRef} className={styles.draggingGate} onMouseDown={handleMouseDown}
    onMouseUp={handleDraggableMouseUp}>
      <Gate x={position.x} y={position.y} width={width} height={height} type={type}/>
    </g>
}

export default DraggingGate;
