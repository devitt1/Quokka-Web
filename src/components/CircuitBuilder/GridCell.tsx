import React, {useCallback, useContext, useRef, useState} from 'react';
import {CursorContext} from "../Providers/CursorContextProvider";
import styles from './CircuitBuilder.module.scss';
import useMousePosition from "../hooks/useMousePosition";

interface GridCellProps {
    cellXPos : number;
    cellYPos : number;
    hasRect : boolean
}

const GridCell : React.FC <GridCellProps> = (props) => {
    const [hovered, setHovered] = useState(false);
    const {cursor ,setCursor } = useContext(CursorContext);
    const [hasRect, setHasRect] = useState(props.hasRect);
    const [showLine, setShowLine] = useState(true);
    const [dragging, setDragging] = useState(false);
    const cellRef : any = useRef(null);


    const [position, setPosition] = useState({
        x: props.cellXPos,
        y : props.cellYPos,
        coords : { x: props.cellXPos, y: props.cellYPos}
    });


    const handleMouseDown = (event : any) => {
        console.log("mouse down...");
        //
        if (!cursor.active) {
            console.log("cursor not active!");
            return;
        }

        setHasRect(true);
        setShowLine(false);
        removeAttachment();

    }
    const removeAttachment = useCallback(() => {
        setCursor(({active}) => ({active: false}));
    },[])

    const handleMouseUp = () => {
        console.log("mouse up");
        document.removeEventListener('mousemove', handleDraggableMouseMove.current);

        if (cursor.active) {
            console.log("cursor is active!");
            return;
        }
    }

    const handleMouseEnter = () => {
        console.log("Mouse entered...");
        setHovered(true);
    }

    const handleMouseLeave = () => {
        // console.log("Mouse left...");
        setHovered(false);
    }

    const getCellStyle = () => {
        if (hovered) {
            if (hasRect) {
                return styles.hasRect;
            }
            return styles.hover;
        } else if (!hovered) {
            if (hasRect) {
                return styles.hasRect;
            }
            return '';

        }
    }

    const handleDraggableMouseDown = (event : any) => {
        console.log("Draggable mouse down...");
        console.log("event page x", event.pageX);
        setDragging(true);
        document.addEventListener('mousemove', handleDraggableMouseMove.current);
    }

    const handleDraggableMouseMove = useRef((e : any) => {
        // console.log(`coord x ${position.coords.x} coord y ${position.coords.y}`);
        // console.log(`pageX ${e.pageX} pageY ${e.pageY}`);
        // console.log(`clientX ${e.clientX} clientY ${e.clientY}`);
        setShowLine(true);

        setPosition(position => {
            const newX = e.pageX - 75;
            const newY = e.pageY - 235;

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
        const roundX = Math.floor(event.clientX / 48 ) * 48;
        const roundY = Math.floor(event.clientY / 39) * 39;
        console.log(`roundX ${roundX} roundY ${roundY}`);

        const newX = roundX - 48;
        const newY = roundY - 234;
        console.log("draggable mouse up");
        if (dragging) {
            setPosition(position => {
                return {
                    x:newX,
                    y:newY,
                    coords: {
                        x: event.pageX,
                        y: event.pageY,
                    },
                };
            });
        }

    }




    return (
        <svg className={styles.gridCell}>
            <rect ref={cellRef} x={props.cellXPos} y={props.cellYPos} width="40" height="38"
                  className={getCellStyle()}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
            />

            {
                hasRect  ?
                    // <rect className={styles.draggable} width="40" height="38"
                    //       x={position.x} y={position.y}
                    //       onMouseDown={handleDraggableMouseDown}
                    //       onMouseUp={handleDraggableMouseUp}
                    // /> :

                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                         x={position.x} y={position.y}

                         onMouseDown={handleDraggableMouseDown}
                         onMouseUp={handleDraggableMouseUp}>
                        <rect  className={styles.draggable} width="40" height="40" rx="4" fill="url(#paint0_linear_349_5172)"/>
                        <path d="M26.426 27H24.2125C24.0605 27 23.937 26.9588 23.842 26.8765C23.747 26.7942 23.671 26.7023 23.614 26.601L20.213 21.1195C20.1877 21.1955 20.1592 21.2683 20.1275 21.338C20.1022 21.4077 20.0705 21.4742 20.0325 21.5375L16.7455 26.601C16.6758 26.7023 16.5967 26.7942 16.508 26.8765C16.4257 26.9588 16.3148 27 16.1755 27H14.1045L18.7215 19.97L14.2945 13.32H16.4985C16.6568 13.32 16.7708 13.3453 16.8405 13.396C16.9165 13.4403 16.983 13.51 17.04 13.605L20.365 18.83C20.3967 18.754 20.4283 18.678 20.46 18.602C20.4917 18.526 20.5328 18.4468 20.5835 18.3645L23.6805 13.643C23.7438 13.5353 23.8135 13.4562 23.8895 13.4055C23.9655 13.3485 24.0573 13.32 24.165 13.32H26.2835L21.8185 19.875L26.426 27Z" fill="white"/>
                        <defs>
                            <linearGradient id="paint0_linear_349_5172" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#1F2E4D"/>
                                <stop offset="1" stop-color="#63718B"/>
                            </linearGradient>
                        </defs>
                    </svg> :
                   null
            }

            {
                showLine ?
                    <line className={styles.line} x1={props.cellXPos} y1={props.cellYPos + 20}
                          x2={props.cellXPos+40} y2={props.cellYPos + 20} />
                    :
                    null
            }



        </svg>


    )
}

export default GridCell;
