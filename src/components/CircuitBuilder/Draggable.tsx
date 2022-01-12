import React from 'react';
import styles from './CircuitBuilder.module.scss';

export interface DraggableProps {
    children : any,
    dragObject : any,
    onDragStart : any,
    onDragEnd : any
}

export const Draggable = (props : DraggableProps) => {
    const { children, dragObject, onDragStart, onDragEnd } = props;
    const onDragStarting = (e : any) => {
        // Get the block coordinates
        let currentTargetRect = e.currentTarget.getBoundingClientRect();
        // Find the offset of the mouse from those coordinates.
        const offset = [
            e.clientX - currentTargetRect.left,
            e.clientY - currentTargetRect.top
        ];

        // Pass the drag data
        onDragStart({ dragObject, offset });
    };

    const onDragEnding = (e : any) => {
        e.stopPropagation();
        onDragEnd();
    };

    return (
        <div
            className={styles.draggable}
            draggable={true}
            onDragStart={onDragStarting}
            onDragEnd={onDragEnding}
        >
            {children}
        </div>
    );
};
