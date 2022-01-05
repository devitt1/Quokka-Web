import d3 from 'd3';
import React from 'react';
import styles from './CircuitBuilder.module.scss';

const CircuitArrangement : React.FC = () => {

    const Draggable = ({ children, dragObject, onDragStart, onDragEnd } : any) => {
        const onDragStarting = (e : any) => {
            let currentTargetRect = e.currentTarget.getBoundingClientRect();
            const offset = [
                e.clientX - currentTargetRect.left,
                e.clientY - currentTargetRect.top
            ];

            // Pass the ddrag data
            onDragStart({ dragObject, offset});
        }

        const onDragEnding = (e : any) => {
            e.stopPropagation();
            onDragEnd();
        };

        return (
            <div draggable={true} onDragStart={onDragStarting} onDragEnd={onDragEnding}>
                {children}
            </div>
        );

    }

    const blocks = [
        { name: "A", color: "blue" },
        { name: "B", color: "pink" },
        { name: "C", color: "green" },
        { name: "D", color: "yellow" },
        { name: "E", color: "purple" }
    ];

    const DraggableBlocks = ({ setDragData } : any) => {
        const onDragStart = (dragData : any) => {
            setDragData(dragData);
        };

        const onDragEnd = () => {};

        return (
            <div className="dragging-blocks">
                {blocks.map((b) => (
                    <Draggable
                        key={b.name}
                        dragObject={b}
                        onDragStart={(dragData : any) => onDragStart(dragData)}
                        onDragEnd={() => onDragEnd()}
                    >
                        <div className="block" style={{ backgroundColor: b.color }}>
                            {b.name}
                        </div>
                    </Draggable>
                ))}
            </div>
        );
    };

    const SVGArea = ({ draggedData } : any) => {
        const onDragOver = (e : any) => {
            e.preventDefault();
            d3.select("svg").classed("drag-over", true);
        };

        const onDragLeave = () => {
            d3.select("svg").classed("drag-over", false);
        };
        const onDrop = (e : any) => {
            e.stopPropagation();
            d3.select("svg").classed("drag-over", false);

            return false;
        };

        return (
            <div
                className="svgContainer"
                onDrop={(e) => onDrop(e)}
                onDragLeave={(e) => onDragLeave()}
                onDragOver={(e) => onDragOver(e)}
            >
                <svg></svg>
            </div>
        );
    };


    return (<div className={styles.circuitArrangement}>

            <div className={styles.qubit}>
            </div>
    </div>
    )
}


export default CircuitArrangement;
